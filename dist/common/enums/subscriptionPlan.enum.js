"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlan = void 0;
const graphql_1 = require("@nestjs/graphql");
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "FREE";
    SubscriptionPlan["BASIC"] = "BASIC";
    SubscriptionPlan["PREMIUM"] = "PREMIUM";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
(0, graphql_1.registerEnumType)(SubscriptionPlan, {
    name: 'SubscriptionPlan',
    description: 'Available subscription plans',
});
