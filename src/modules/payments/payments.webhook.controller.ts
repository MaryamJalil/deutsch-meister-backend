import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentsService } from './payments.service';

@Controller('stripe')
export class PaymentsWebhookController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') sig: string,
  ) {
    if (!sig) throw new BadRequestException('Missing stripe-signature header');

    // Express raw body — requires bodyParser raw for this route (configured in main.ts)
    const rawBody = (req as any).rawBody as Buffer | undefined;
    if (!rawBody) throw new BadRequestException('Raw body not available');

    await this.paymentsService.handleWebhook(rawBody, sig);
    return { received: true };
  }
}
