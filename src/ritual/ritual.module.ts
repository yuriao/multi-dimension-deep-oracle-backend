import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RitualController } from './ritual.controller';
import { RitualService } from './ritual.service';
import { Decision } from '../decision/entities/decision.entity';
import { DailyReading } from '../decision/entities/daily-reading.entity';
import { DivinationModule } from '../divination/divination.module';
import { UserModule } from '../user/user.module';
import { ContentModule } from '../content/content.module';
import { DeepSeekModule } from '../deepseek/deepseek.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Decision, DailyReading]),
    DivinationModule,
    UserModule,
    ContentModule,
    DeepSeekModule,
  ],
  controllers: [RitualController],
  providers: [RitualService],
  exports: [RitualService],
})
export class RitualModule {}
