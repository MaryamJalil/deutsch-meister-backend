"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "ACTIVE";
    SubscriptionStatus["CANCELED"] = "CANCELED";
    SubscriptionStatus["PAST_DUE"] = "PAST_DUE";
    SubscriptionStatus["TRIALING"] = "TRIALING";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
(0, graphql_1.registerEnumType)(SubscriptionStatus, {
    name: 'SubscriptionStatus',
    description: 'Current status of a Stripe subscription',
});
