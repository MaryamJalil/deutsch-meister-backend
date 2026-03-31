import { registerEnumType } from '@nestjs/graphql';

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  TRIALING = 'TRIALING',
}

registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus',
  description: 'Current status of a Stripe subscription',
});
