import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DivinationModule } from './divination/divination.module';
import { DecisionModule } from './decision/decision.module';
import { DeepSeekModule } from './deepseek/deepseek.module';
import { ChatModule } from './chat/chat.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { User } from './user/entities/user.entity';
import { UserProfile } from './user/entities/user-profile.entity';
import { Decision } from './decision/entities/decision.entity';
import { DailyReading } from './decision/entities/daily-reading.entity';
import { ChatMessage } from './chat/entities/chat-message.entity';
import { Subscription } from './subscription/entities/subscription.entity';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database - Using Supabase PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        // Alternative: use individual fields if DATABASE_URL not set
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, UserProfile, Decision, DailyReading, ChatMessage, Subscription],
        synchronize: true, // Auto-create tables in development - DISABLE IN PRODUCTION!
        logging: configService.get('NODE_ENV') === 'development',
        ssl: {
          rejectUnauthorized: false, // Required for Supabase
        },
      }),
      inject: [ConfigService],
    }),

    // Bull Queue - Disabled for now (requires Redis)
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     redis: {
    //       host: configService.get('REDIS_HOST', 'localhost'),
    //       port: configService.get('REDIS_PORT', 6379),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),

    // Feature modules
    AuthModule,
    UserModule,
    DivinationModule,
    DecisionModule,
    DeepSeekModule,
    ChatModule,
    SubscriptionModule,
  ],
})
export class AppModule {}
