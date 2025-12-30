import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Headers,
  RawBodyRequest,
  Req,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import Stripe from 'stripe';

@Controller('subscription')
export class SubscriptionController {
  private stripe: Stripe;

  constructor(private readonly subscriptionService: SubscriptionService) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey) {
      this.stripe = new Stripe(stripeKey, {
        apiVersion: '2024-12-18.acacia',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-apple')
  @HttpCode(HttpStatus.OK)
  async verifyApple(@Request() req, @Body() body: { receipt: string }) {
    const userId = req.user.id;
    const { receipt } = body;

    if (!receipt) {
      throw new BadRequestException('Receipt is required');
    }

    return this.subscriptionService.verifyAppleReceipt(userId, receipt);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-google')
  @HttpCode(HttpStatus.OK)
  async verifyGoogle(
    @Request() req,
    @Body() body: { purchase_token: string; product_id: string },
  ) {
    const userId = req.user.id;
    const { purchase_token, product_id } = body;

    if (!purchase_token || !product_id) {
      throw new BadRequestException('Purchase token and product ID are required');
    }

    return this.subscriptionService.verifyGoogleReceipt(
      userId,
      purchase_token,
      product_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-stripe-checkout')
  @HttpCode(HttpStatus.OK)
  async createStripeCheckout(
    @Request() req,
    @Body() body: { price_id: string; product_type: string },
  ) {
    const userId = req.user.id;
    const { price_id, product_type } = body;

    if (!price_id) {
      throw new BadRequestException('Price ID is required');
    }

    return this.subscriptionService.createStripeCheckout(
      userId,
      price_id,
      product_type,
    );
  }

  @Post('stripe-webhook')
  @HttpCode(HttpStatus.OK)
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!this.stripe) {
      throw new BadRequestException('Stripe not configured');
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new BadRequestException('Webhook secret not configured');
    }

    let event: Stripe.Event;

    try {
      // Get raw body for signature verification
      const rawBody = req.body;
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    await this.subscriptionService.handleStripeWebhook(event);

    return { received: true };
  }
}
