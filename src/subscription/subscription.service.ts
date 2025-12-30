import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { UserService } from '../user/user.service';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    private userService: UserService,
  ) {
    // Initialize Stripe
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (stripeKey) {
      this.stripe = new Stripe(stripeKey, {
        apiVersion: '2024-12-18.acacia',
      });
    }
  }

  /**
   * Verify Apple IAP receipt
   */
  async verifyAppleReceipt(userId: string, receipt: string): Promise<any> {
    try {
      // Apple receipt verification endpoint
      const isProduction = process.env.NODE_ENV === 'production';
      const verifyUrl = isProduction
        ? 'https://buy.itunes.apple.com/verifyReceipt'
        : 'https://sandbox.itunes.apple.com/verifyReceipt';

      const applePassword = process.env.APPLE_SHARED_SECRET;

      if (!applePassword) {
        throw new BadRequestException(
          'Apple shared secret not configured',
        );
      }

      const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'receipt-data': receipt,
          password: applePassword,
          'exclude-old-transactions': true,
        }),
      });

      const data = await response.json();

      if (data.status !== 0) {
        // If sandbox receipt sent to production, try sandbox
        if (data.status === 21007) {
          const sandboxResponse = await fetch(
            'https://sandbox.itunes.apple.com/verifyReceipt',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                'receipt-data': receipt,
                password: applePassword,
                'exclude-old-transactions': true,
              }),
            },
          );
          const sandboxData = await sandboxResponse.json();
          if (sandboxData.status === 0) {
            return this.processAppleReceipt(userId, sandboxData, receipt);
          }
        }
        throw new BadRequestException(`Invalid receipt: ${data.status}`);
      }

      return this.processAppleReceipt(userId, data, receipt);
    } catch (error) {
      console.error('Apple receipt verification error:', error);
      throw new BadRequestException('Receipt verification failed');
    }
  }

  /**
   * Process verified Apple receipt
   */
  private async processAppleReceipt(
    userId: string,
    receiptData: any,
    receipt: string,
  ): Promise<any> {
    const latestReceiptInfo = receiptData.latest_receipt_info?.[0];
    const pendingRenewalInfo = receiptData.pending_renewal_info?.[0];

    if (!latestReceiptInfo) {
      throw new BadRequestException('No subscription found in receipt');
    }

    const productId = latestReceiptInfo.product_id;
    const originalTransactionId = latestReceiptInfo.original_transaction_id;
    const expiresDate = new Date(
      parseInt(latestReceiptInfo.expires_date_ms),
    );
    const isActive = expiresDate > new Date();
    const autoRenew = pendingRenewalInfo?.auto_renew_status === '1';

    // Determine interval from product ID
    const interval = productId.includes('yearly') ? 'year' : 'month';

    // Update or create subscription
    let subscription = await this.subscriptionRepository.findOne({
      where: {
        platform: 'ios',
        platform_subscription_id: originalTransactionId,
      },
    });

    if (subscription) {
      subscription.status = isActive ? 'active' : 'expired';
      subscription.expiry_date = expiresDate;
      subscription.auto_renew = autoRenew;
      subscription.receipt_data = receipt;
      subscription.metadata = { latest_receipt_info: latestReceiptInfo };
    } else {
      subscription = this.subscriptionRepository.create({
        user_id: userId,
        platform: 'ios',
        product_id: productId,
        platform_subscription_id: originalTransactionId,
        status: isActive ? 'active' : 'expired',
        interval,
        start_date: new Date(parseInt(latestReceiptInfo.purchase_date_ms)),
        expiry_date: expiresDate,
        auto_renew: autoRenew,
        receipt_data: receipt,
        metadata: { latest_receipt_info: latestReceiptInfo },
      });
    }

    await this.subscriptionRepository.save(subscription);

    // Update user subscription tier
    await this.userService.updateSubscriptionTier(
      userId,
      isActive ? 'premium' : 'free',
    );

    return {
      success: true,
      subscription_id: subscription.id,
      status: subscription.status,
      expiry_date: subscription.expiry_date,
    };
  }

  /**
   * Verify Google Play purchase
   */
  async verifyGoogleReceipt(
    userId: string,
    purchaseToken: string,
    productId: string,
  ): Promise<any> {
    try {
      const { OAuth2Client } = require('google-auth-library');

      const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
      if (!serviceAccountKey) {
        throw new BadRequestException(
          'Google service account not configured',
        );
      }

      const serviceAccount = JSON.parse(serviceAccountKey);
      const client = new OAuth2Client();
      client.setCredentials({
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      });

      const packageName = process.env.ANDROID_PACKAGE_NAME;

      // Call Google Play Developer API
      const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${productId}/tokens/${purchaseToken}`;

      const accessToken = await client.getAccessToken();

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      });

      if (!response.ok) {
        throw new BadRequestException('Invalid purchase token');
      }

      const data = await response.json();

      return this.processGooglePurchase(userId, data, purchaseToken, productId);
    } catch (error) {
      console.error('Google receipt verification error:', error);
      throw new BadRequestException('Receipt verification failed');
    }
  }

  /**
   * Process verified Google purchase
   */
  private async processGooglePurchase(
    userId: string,
    purchaseData: any,
    purchaseToken: string,
    productId: string,
  ): Promise<any> {
    const expiresDate = new Date(parseInt(purchaseData.expiryTimeMillis));
    const isActive = expiresDate > new Date();
    const autoRenew = purchaseData.autoRenewing === true;

    // Determine interval from product ID
    const interval = productId.includes('yearly') ? 'year' : 'month';

    // Update or create subscription
    let subscription = await this.subscriptionRepository.findOne({
      where: {
        platform: 'android',
        platform_subscription_id: purchaseData.orderId,
      },
    });

    if (subscription) {
      subscription.status = isActive ? 'active' : 'expired';
      subscription.expiry_date = expiresDate;
      subscription.auto_renew = autoRenew;
      subscription.receipt_data = purchaseToken;
      subscription.metadata = purchaseData;
    } else {
      subscription = this.subscriptionRepository.create({
        user_id: userId,
        platform: 'android',
        product_id: productId,
        platform_subscription_id: purchaseData.orderId,
        status: isActive ? 'active' : 'expired',
        interval,
        start_date: new Date(parseInt(purchaseData.startTimeMillis)),
        expiry_date: expiresDate,
        auto_renew: autoRenew,
        receipt_data: purchaseToken,
        metadata: purchaseData,
      });
    }

    await this.subscriptionRepository.save(subscription);

    // Update user subscription tier
    await this.userService.updateSubscriptionTier(
      userId,
      isActive ? 'premium' : 'free',
    );

    return {
      success: true,
      subscription_id: subscription.id,
      status: subscription.status,
      expiry_date: subscription.expiry_date,
    };
  }

  /**
   * Create Stripe Checkout session
   */
  async createStripeCheckout(
    userId: string,
    priceId: string,
    productType: string,
  ): Promise<any> {
    if (!this.stripe) {
      throw new BadRequestException('Stripe not configured');
    }

    try {
      const user = await this.userService.findById(userId);

      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        customer_email: user.email,
        client_reference_id: userId,
        metadata: {
          user_id: userId,
          product_type: productType,
        },
        success_url: `${process.env.FRONTEND_URL}/pages/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/pages/subscription/index`,
      });

      return {
        checkout_url: session.url,
        session_id: session.id,
      };
    } catch (error) {
      console.error('Stripe checkout creation error:', error);
      throw new BadRequestException('Failed to create checkout session');
    }
  }

  /**
   * Handle Stripe webhook events
   */
  async handleStripeWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
    const userId = session.client_reference_id || session.metadata?.user_id;
    if (!userId) return;

    // Subscription will be created by subscription.created event
    console.log(`Checkout completed for user ${userId}`);
  }

  private async handleSubscriptionUpdated(stripeSubscription: Stripe.Subscription): Promise<void> {
    const userId = stripeSubscription.metadata?.user_id;
    if (!userId) return;

    const isActive = stripeSubscription.status === 'active' || stripeSubscription.status === 'trialing';
    const priceId = stripeSubscription.items.data[0]?.price.id;
    const interval = stripeSubscription.items.data[0]?.price.recurring?.interval || 'month';

    // Update or create subscription
    let subscription = await this.subscriptionRepository.findOne({
      where: {
        platform: 'web',
        platform_subscription_id: stripeSubscription.id,
      },
    });

    if (subscription) {
      subscription.status = isActive ? 'active' : 'expired';
      subscription.expiry_date = new Date(stripeSubscription.current_period_end * 1000);
      subscription.auto_renew = !stripeSubscription.cancel_at_period_end;
      subscription.metadata = stripeSubscription;
    } else {
      subscription = this.subscriptionRepository.create({
        user_id: userId,
        platform: 'web',
        product_id: priceId,
        platform_subscription_id: stripeSubscription.id,
        status: isActive ? 'active' : 'expired',
        interval: interval as 'month' | 'year',
        start_date: new Date(stripeSubscription.current_period_start * 1000),
        expiry_date: new Date(stripeSubscription.current_period_end * 1000),
        auto_renew: !stripeSubscription.cancel_at_period_end,
        metadata: stripeSubscription,
      });
    }

    await this.subscriptionRepository.save(subscription);

    // Update user tier
    await this.userService.updateSubscriptionTier(
      userId,
      isActive ? 'premium' : 'free',
    );
  }

  private async handleSubscriptionDeleted(stripeSubscription: Stripe.Subscription): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        platform: 'web',
        platform_subscription_id: stripeSubscription.id,
      },
    });

    if (subscription) {
      subscription.status = 'cancelled';
      await this.subscriptionRepository.save(subscription);

      // Update user tier
      await this.userService.updateSubscriptionTier(subscription.user_id, 'free');
    }
  }

  private async handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    console.log(`Payment succeeded for invoice ${invoice.id}`);
    // Payment success is handled by subscription.updated event
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    const subscriptionId = invoice.subscription as string;
    if (!subscriptionId) return;

    const subscription = await this.subscriptionRepository.findOne({
      where: {
        platform: 'web',
        platform_subscription_id: subscriptionId,
      },
    });

    if (subscription) {
      // Mark as expired if payment fails
      subscription.status = 'expired';
      await this.subscriptionRepository.save(subscription);

      await this.userService.updateSubscriptionTier(subscription.user_id, 'free');
    }
  }

  /**
   * Get user's active subscription
   */
  async getActiveSubscription(userId: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({
      where: {
        user_id: userId,
        status: 'active',
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  /**
   * Check if user has premium access
   */
  async hasPremiumAccess(userId: string): Promise<boolean> {
    const subscription = await this.getActiveSubscription(userId);

    if (!subscription) {
      return false;
    }

    // Check if subscription is still valid
    if (subscription.expiry_date && subscription.expiry_date > new Date()) {
      return true;
    }

    // If expired, update status
    subscription.status = 'expired';
    await this.subscriptionRepository.save(subscription);
    await this.userService.updateSubscriptionTier(userId, 'free');

    return false;
  }
}
