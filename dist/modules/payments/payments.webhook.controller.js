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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsWebhookController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
let PaymentsWebhookController = class PaymentsWebhookController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async handleWebhook(req, sig) {
        if (!sig)
            throw new common_1.BadRequestException('Missing stripe-signature header');
        // Express raw body — requires bodyParser raw for this route (configured in main.ts)
        const rawBody = req.rawBody;
        if (!rawBody)
            throw new common_1.BadRequestException('Raw body not available');
        await this.paymentsService.handleWebhook(rawBody, sig);
        return { received: true };
    }
};
exports.PaymentsWebhookController = PaymentsWebhookController;
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsWebhookController.prototype, "handleWebhook", null);
exports.PaymentsWebhookController = PaymentsWebhookController = __decorate([
    (0, common_1.Controller)('stripe'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsWebhookController);
