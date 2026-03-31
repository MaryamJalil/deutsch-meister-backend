import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionPlan {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}

registerEnumType(SubscriptionPlan, {
  name: 'SubscriptionPlan',
  description: 'Available subscription plans',
});
