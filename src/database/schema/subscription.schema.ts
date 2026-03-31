import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { subscriptionPlanEnum, subscriptionStatusEnum } from './enums';

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: serial('id').primaryKey(),

    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),

    stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),

    plan: subscriptionPlanEnum('plan').notNull().default('FREE'),

    status: subscriptionStatusEnum('status').notNull().default('ACTIVE'),

    currentPeriodEnd: timestamp('current_period_end'),

    createdAt: timestamp('created_at').notNull().defaultNow(),

    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('subscriptions_user_idx').on(table.userId),
    stripeSubIdx: index('subscriptions_stripe_sub_idx').on(
      table.stripeSubscriptionId,
    ),
  }),
);
