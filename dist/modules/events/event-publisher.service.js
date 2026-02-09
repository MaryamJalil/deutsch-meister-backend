"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventPublisherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPublisherService = void 0;
const common_1 = require("@nestjs/common");
const client_eventbridge_1 = require("@aws-sdk/client-eventbridge");
let EventPublisherService = EventPublisherService_1 = class EventPublisherService {
    constructor() {
        this.logger = new common_1.Logger(EventPublisherService_1.name);
        this.client = new client_eventbridge_1.EventBridgeClient({
            region: process.env.AWS_REGION,
        });
    }
    async publish(eventType, detail) {
        const command = new client_eventbridge_1.PutEventsCommand({
            Entries: [
                {
                    Source: 'deutsch-meister',
                    DetailType: eventType,
                    Detail: JSON.stringify(detail),
                    EventBusName: process.env.EVENT_BUS_NAME,
                },
            ],
        });
        await this.client.send(command);
        this.logger.log(`Published event ${eventType}`);
    }
};
exports.EventPublisherService = EventPublisherService;
exports.EventPublisherService = EventPublisherService = EventPublisherService_1 = __decorate([
    (0, common_1.Injectable)()
], EventPublisherService);
