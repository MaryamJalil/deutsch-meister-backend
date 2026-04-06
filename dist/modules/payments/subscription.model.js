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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCheckoutSessionInput = exports.CheckoutSession = exports.Subscription = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const subscriptionPlan_enum_1 = require("../../common/enums/subscriptionPlan.enum");
const subscriptionStatus_enum_1 = require("../../common/enums/subscriptionStatus.enum");
let Subscription = class Subscription {
};
exports.Subscription = Subscription;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Subscription.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Subscription.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => subscriptionPlan_enum_1.SubscriptionPlan),
    __metadata("design:type", String)
], Subscription.prototype, "plan", void 0);
__decorate([
    (0, graphql_1.Field)(() => subscriptionStatus_enum_1.SubscriptionStatus),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "stripeCustomerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "stripeSubscriptionId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "currentPeriodEnd", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Subscription.prototype, "createdAt", void 0);
exports.Subscription = Subscription = __decorate([
    (0, graphql_1.ObjectType)()
], Subscription);
let CheckoutSession = class CheckoutSession {
};
exports.CheckoutSession = CheckoutSession;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CheckoutSession.prototype, "url", void 0);
exports.CheckoutSession = CheckoutSession = __decorate([
    (0, graphql_1.ObjectType)()
], CheckoutSession);
let CreateCheckoutSessionInput = class CreateCheckoutSessionInput {
};
exports.CreateCheckoutSessionInput = CreateCheckoutSessionInput;
__decorate([
    (0, class_validator_1.IsEnum)(subscriptionPlan_enum_1.SubscriptionPlan),
    (0, graphql_1.Field)(() => subscriptionPlan_enum_1.SubscriptionPlan),
    __metadata("design:type", String)
], CreateCheckoutSessionInput.prototype, "plan", void 0);
exports.CreateCheckoutSessionInput = CreateCheckoutSessionInput = __decorate([
    (0, graphql_1.InputType)()
], CreateCheckoutSessionInput);
