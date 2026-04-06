import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { subscriptions } from '../../database/schema/subscription.schema';
import { db } from '../../database/drizzle';

import { eq } from 'drizzle-orm';
import { SubscriptionPlan } from '../../common/enums/subscriptionPlan.enum';
import { SubscriptionStatus } from '../../common/enums/subscriptionStatus.enum';


@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private stripe: Stripe;

  constructor() {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      this.logger.warn(
        'STRIPE_SECRET_KEY not set — payments will not function',
      );
    }
    this.stripe = new Stripe(apiKey ?? 'sk_test_placeholder', {
      apiVersion: '2026-03-25.dahlia',
    });
  }

  async createCheckoutSession(userId: number, plan: SubscriptionPlan) {
    if (plan === SubscriptionPlan.FREE) {
      throw new BadRequestException(
        'Cannot create checkout session for FREE plan',
      );
    }

    const priceIds: Record<SubscriptionPlan, string | undefined> = {
      [SubscriptionPlan.FREE]: undefined,
      [SubscriptionPlan.BASIC]: process.env.STRIPE_BASIC_PRICE_ID,
      [SubscriptionPlan.PREMIUM]: process.env.STRIPE_PREMIUM_PRICE_ID,
    };
    const priceId = priceIds[plan];
    if (!priceId) {
      throw new BadRequestException(
        `Price ID for plan ${plan} is not configured`,
      );
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url:
        process.env.STRIPE_SUCCESS_URL ?? 'http://localhost:3000/success',
      cancel_url:
        process.env.STRIPE_CANCEL_URL ?? 'http://localhost:3000/cancel',
      metadata: { userId: String(userId), plan },
    });

    // Upsert a pending subscription so the record exists before webhook fires
    const [existing] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId));

    if (existing) {
      await db
        .update(subscriptions)
        .set({ plan, status: SubscriptionStatus.TRIALING, updatedAt: new Date() })
        .where(eq(subscriptions.id, existing.id));
    } else {
      await db.insert(subscriptions).values({
        userId,
        plan,
        status: SubscriptionStatus.TRIALING,
      });
    }

    return { url: session.url ?? '' };
  }

  async handleWebhook(rawBody: Buffer, sig: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err: any) {
      this.logger.error(
        'Stripe webhook signature verification failed',
        err.message,
      );
      throw new BadRequestException('Invalid Stripe webhook signature');
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = Number(session.metadata?.userId);
        const plan = (session.metadata?.plan ?? 'BASIC') as SubscriptionPlan;
        const stripeCustomerId = session.customer as string;
        const stripeSubscriptionId = session.subscription as string;

        if (!userId) break;

        const [existing] = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.userId, userId));

        if (existing) {
          await db
            .update(subscriptions)
            .set({
              stripeCustomerId,
              stripeSubscriptionId,
              plan,
              status: SubscriptionStatus.ACTIVE,
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.id, existing.id));
        } else {
          await db.insert(subscriptions).values({
            userId,
            stripeCustomerId,
            stripeSubscriptionId,
            plan,
            status: SubscriptionStatus.ACTIVE,
          });
        }
        this.logger.log(`Subscription activated for user ${userId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const status = this.mapStripeStatus(sub.status);
        await db
          .update(subscriptions)
          .set({
            status,
            currentPeriodEnd: new Date((sub.items.data[0]?.current_period_end ?? 0) * 1000),
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await db
          .update(subscriptions)
          .set({ status: SubscriptionStatus.CANCELED, updatedAt: new Date() })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        break;
      }

      default:
        this.logger.log(`Unhandled Stripe event: ${event.type}`);
    }
  }

  private mapStripeStatus(status: string): SubscriptionStatus {
    const map: Record<string, SubscriptionStatus> = {
      active: SubscriptionStatus.ACTIVE,
      canceled: SubscriptionStatus.CANCELED,
      past_due: SubscriptionStatus.PAST_DUE,
      trialing: SubscriptionStatus.TRIALING,
    };
    return map[status] ?? SubscriptionStatus.ACTIVE;
  }

  async getSubscription(userId: number) {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId));
    return sub ?? null;
  }

  async cancelSubscription(userId: number) {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId));

    if (!sub?.stripeSubscriptionId) {
      throw new BadRequestException('No active subscription found');
    }

    await this.stripe.subscriptions.cancel(sub.stripeSubscriptionId);

    const [updated] = await db
      .update(subscriptions)
      .set({ status: SubscriptionStatus.CANCELED, updatedAt: new Date() })
      .where(eq(subscriptions.id, sub.id))
      .returning();

    return updated;
  }
}
