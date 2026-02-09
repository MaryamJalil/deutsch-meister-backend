import { Injectable, Logger } from '@nestjs/common';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';

@Injectable()
export class EventPublisherService {
  private readonly logger = new Logger(EventPublisherService.name);
  private readonly client = new EventBridgeClient({
    region: process.env.AWS_REGION,
  });

  async publish(eventType: string, detail: any) {
    const command = new PutEventsCommand({
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
}
