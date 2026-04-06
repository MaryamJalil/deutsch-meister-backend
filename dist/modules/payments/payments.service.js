"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = __importDefault(require("stripe"));
const subscription_schema_1 = require("../../database/schema/subscription.schema");
const drizzle_1 = require("../../database/drizzle");
const drizzle_orm_1 = require("drizzle-orm");
const subscriptionPlan_enum_1 = require("../../common/enums/subscriptionPlan.enum");
const subscriptionStatus_enum_1 = require("../../common/enums/subscriptionStatus.enum");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor() {
        this.logger = new common_1.Logger(PaymentsService_1.name);
        const apiKey = process.env.STRIPE_SECRET_KEY;
        if (!apiKey) {
            this.logger.warn('STRIPE_SECRET_KEY not set — payments will not function');
        }
        this.stripe = new stripe_1.default(apiKey ?? 'sk_test_placeholder', {
            apiVersion: '2026-03-25.dahlia',
        });
    }
    async createCheckoutSession(userId, plan) {
        if (plan === subscriptionPlan_enum_1.SubscriptionPlan.FREE) {
            throw new common_1.BadRequestException('Cannot create checkout session for FREE plan');
        }
        const priceIds = {
            [subscriptionPlan_enum_1.SubscriptionPlan.FREE]: undefined,
            [subscriptionPlan_enum_1.SubscriptionPlan.BASIC]: process.env.STRIPE_BASIC_PRICE_ID,
            [subscriptionPlan_enum_1.SubscriptionPlan.PREMIUM]: process.env.STRIPE_PREMIUM_PRICE_ID,
        };
        const priceId = priceIds[plan];
        if (!priceId) {
            throw new common_1.BadRequestException(`Price ID for plan ${plan} is not configured`);
        }
        const session = await this.stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: process.env.STRIPE_SUCCESS_URL ?? 'http://localhost:3000/success',
            cancel_url: process.env.STRIPE_CANCEL_URL ?? 'http://localhost:3000/cancel',
            metadata: { userId: String(userId), plan },
        });
        // Upsert a pending subscription so the record exists before webhook fires
        const [existing] = await drizzle_1.db
            .select()
            .from(subscription_schema_1.subscriptions)
            .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.userId, userId));
        if (existing) {
            await drizzle_1.db
                .update(subscription_schema_1.subscriptions)
                .set({ plan, status: subscriptionStatus_enum_1.SubscriptionStatus.TRIALING, updatedAt: new Date() })
                .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.id, existing.id));
        }
        else {
            await drizzle_1.db.insert(subscription_schema_1.subscriptions).values({
                userId,
                plan,
                status: subscriptionStatus_enum_1.SubscriptionStatus.TRIALING,
            });
        }
        return { url: session.url ?? '' };
    }
    async handleWebhook(rawBody, sig) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
        }
        catch (err) {
            this.logger.error('Stripe webhook signature verification failed', err.message);
            throw new common_1.BadRequestException('Invalid Stripe webhook signature');
        }
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const userId = Number(session.metadata?.userId);
                const plan = (session.metadata?.plan ?? 'BASIC');
                const stripeCustomerId = session.customer;
                const stripeSubscriptionId = session.subscription;
                if (!userId)
                    break;
                const [existing] = await drizzle_1.db
                    .select()
                    .from(subscription_schema_1.subscriptions)
                    .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.userId, userId));
                if (existing) {
                    await drizzle_1.db
                        .update(subscription_schema_1.subscriptions)
                        .set({
                        stripeCustomerId,
                        stripeSubscriptionId,
                        plan,
                        status: subscriptionStatus_enum_1.SubscriptionStatus.ACTIVE,
                        updatedAt: new Date(),
                    })
                        .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.id, existing.id));
                }
                else {
                    await drizzle_1.db.insert(subscription_schema_1.subscriptions).values({
                        userId,
                        stripeCustomerId,
                        stripeSubscriptionId,
                        plan,
                        status: subscriptionStatus_enum_1.SubscriptionStatus.ACTIVE,
                    });
                }
                this.logger.log(`Subscription activated for user ${userId}`);
                break;
            }
            case 'customer.subscription.updated': {
                const sub = event.data.object;
                const status = this.mapStripeStatus(sub.status);
                await drizzle_1.db
                    .update(subscription_schema_1.subscriptions)
                    .set({
                    status,
                    currentPeriodEnd: new Date((sub.items.data[0]?.current_period_end ?? 0) * 1000),
                    updatedAt: new Date(),
                })
                    .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.stripeSubscriptionId, sub.id));
                break;
            }
            case 'customer.subscription.deleted': {
                const sub = event.data.object;
                await drizzle_1.db
                    .update(subscription_schema_1.subscriptions)
                    .set({ status: subscriptionStatus_enum_1.SubscriptionStatus.CANCELED, updatedAt: new Date() })
                    .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.stripeSubscriptionId, sub.id));
                break;
            }
            default:
                this.logger.log(`Unhandled Stripe event: ${event.type}`);
        }
    }
    mapStripeStatus(status) {
        const map = {
            active: subscriptionStatus_enum_1.SubscriptionStatus.ACTIVE,
            canceled: subscriptionStatus_enum_1.SubscriptionStatus.CANCELED,
            past_due: subscriptionStatus_enum_1.SubscriptionStatus.PAST_DUE,
            trialing: subscriptionStatus_enum_1.SubscriptionStatus.TRIALING,
        };
        return map[status] ?? subscriptionStatus_enum_1.SubscriptionStatus.ACTIVE;
    }
    async getSubscription(userId) {
        const [sub] = await drizzle_1.db
            .select()
            .from(subscription_schema_1.subscriptions)
            .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.userId, userId));
        return sub ?? null;
    }
    async cancelSubscription(userId) {
        const [sub] = await drizzle_1.db
            .select()
            .from(subscription_schema_1.subscriptions)
            .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.userId, userId));
        if (!sub?.stripeSubscriptionId) {
            throw new common_1.BadRequestException('No active subscription found');
        }
        await this.stripe.subscriptions.cancel(sub.stripeSubscriptionId);
        const [updated] = await drizzle_1.db
            .update(subscription_schema_1.subscriptions)
            .set({ status: subscriptionStatus_enum_1.SubscriptionStatus.CANCELED, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(subscription_schema_1.subscriptions.id, sub.id))
            .returning();
        return updated;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PaymentsService);
