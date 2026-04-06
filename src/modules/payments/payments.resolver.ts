import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  Subscription,
  CheckoutSession,
  CreateCheckoutSessionInput,
} from './subscription.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => CheckoutSession)
  @UseGuards(GqlAuthGuard)
  async createCheckoutSession(
    @CurrentUser() user: { id: number },
    @Args('input', { type: () => CreateCheckoutSessionInput })
    input: CreateCheckoutSessionInput,
  ): Promise<CheckoutSession> {
    if (!input.plan) {
      throw new BadRequestException('Plan is required');
    }
    console.log(input.plan);
    return this.paymentsService.createCheckoutSession(user.id, input.plan);
  }

  @Mutation(() => Subscription)
  @UseGuards(GqlAuthGuard)
  async cancelSubscription(
    @CurrentUser() user: { id: number },
  ): Promise<Subscription> {
    return this.paymentsService.cancelSubscription(user.id) as any;
  }

  @Query(() => Subscription, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async mySubscription(
    @CurrentUser() user: { id: number },
  ): Promise<Subscription | null> {
    return this.paymentsService.getSubscription(user.id) as any;
  }
}
