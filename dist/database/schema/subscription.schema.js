"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_schema_1 = require("./user.schema");
const enums_1 = require("./enums");
exports.subscriptions = (0, pg_core_1.pgTable)('subscriptions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id')
        .notNull()
        .references(() => user_schema_1.users.id, { onDelete: 'cascade' }),
    stripeCustomerId: (0, pg_core_1.varchar)('stripe_customer_id', { length: 255 }),
    stripeSubscriptionId: (0, pg_core_1.varchar)('stripe_subscription_id', { length: 255 }),
    plan: (0, enums_1.subscriptionPlanEnum)('plan').notNull().default('FREE'),
    status: (0, enums_1.subscriptionStatusEnum)('status').notNull().default('ACTIVE'),
    currentPeriodEnd: (0, pg_core_1.timestamp)('current_period_end'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
}, (table) => ({
    userIdx: (0, pg_core_1.index)('subscriptions_user_idx').on(table.userId),
    stripeSubIdx: (0, pg_core_1.index)('subscriptions_stripe_sub_idx').on(table.stripeSubscriptionId),
}));
