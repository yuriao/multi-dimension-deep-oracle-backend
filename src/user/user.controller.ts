import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    return this.userService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(req.user.id, updateProfileDto);
  }

  // Get user entitlements - unified endpoint for subscription status
  @UseGuards(JwtAuthGuard)
  @Get('me/entitlements')
  async getEntitlements(@Request() req) {
    const user = await this.userService.findOne(req.user.id);
    const isPremium = user.subscription_tier === 'premium' || user.subscription_tier === 'admin';

    return {
      user_id: user.id,
      tier: user.subscription_tier,
      is_premium: isPremium,
      entitlements: {
        chat: isPremium,
        // Add more entitlements here as needed
        // advanced_readings: isPremium,
        // unlimited_questions: isPremium,
      },
    };
  }

  // Sync subscription status from RevenueCat
  @UseGuards(JwtAuthGuard)
  @Post('sync-subscription')
  @HttpCode(HttpStatus.OK)
  async syncSubscription(@Request() req, @Body() body: any) {
    const userId = req.user.id;
    const hasPremium = body.has_premium;

    // Update user's subscription tier
    const newTier = hasPremium ? 'premium' : 'free';
    await this.userService.updateSubscriptionTier(userId, newTier);

    return {
      success: true,
      subscription_tier: newTier,
    };
  }

  // RevenueCat Webhook endpoint
  // This endpoint receives events from RevenueCat when subscriptions change
  @Post('revenuecat-webhook')
  @HttpCode(HttpStatus.OK)
  async handleRevenueCatWebhook(
    @Headers('authorization') authHeader: string,
    @Body() body: any,
  ) {
    // Verify the webhook is from RevenueCat
    // TODO: Add proper webhook signature verification
    // See: https://www.revenuecat.com/docs/webhooks#webhook-authentication

    const event = body.event;
    const appUserId = event?.app_user_id;

    if (!appUserId) {
      return { received: true };
    }

    // Handle different event types
    switch (event.type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'UNCANCELLATION':
        // User has active subscription - upgrade to premium
        await this.userService.updateSubscriptionTierByUserId(appUserId, 'premium');
        break;

      case 'CANCELLATION':
      case 'EXPIRATION':
      case 'BILLING_ISSUE':
        // Subscription ended - downgrade to free
        await this.userService.updateSubscriptionTierByUserId(appUserId, 'free');
        break;

      case 'PRODUCT_CHANGE':
        // User changed subscription plan - still premium
        await this.userService.updateSubscriptionTierByUserId(appUserId, 'premium');
        break;

      default:
        console.log(`Unhandled RevenueCat event type: ${event.type}`);
    }

    return { received: true };
  }
}
