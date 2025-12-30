import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecisionService } from './decision.service';
import { DecisionController } from './decision.controller';
import { DailyController } from './daily.controller';
import { Decision } from './entities/decision.entity';
import { DailyReading } from './entities/daily-reading.entity';
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
  providers: [DecisionService],
  controllers: [DecisionController, DailyController],
  exports: [DecisionService],
})
export class DecisionModule {}
