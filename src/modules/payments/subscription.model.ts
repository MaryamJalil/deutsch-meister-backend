import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { SubscriptionPlan } from '../../common/enums/subscriptionPlan.enum';
import { SubscriptionStatus } from '../../common/enums/subscriptionStatus.enum';

@ObjectType()
export class Subscription {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  userId!: number;

  @Field(() => SubscriptionPlan)
  plan!: SubscriptionPlan;

  @Field(() => SubscriptionStatus)
  status!: SubscriptionStatus;

  @Field(() => String, { nullable: true })
  stripeCustomerId?: string | null;

  @Field(() => String, { nullable: true })
  stripeSubscriptionId?: string | null;

  @Field(() => Date, { nullable: true })
  currentPeriodEnd?: Date | null;

  @Field()
  createdAt!: Date;
}

@ObjectType()
export class CheckoutSession {
  @Field()
  url!: string;
}

@InputType()
export class CreateCheckoutSessionInput {
  @Field(() => SubscriptionPlan)
  plan!: SubscriptionPlan;
}
