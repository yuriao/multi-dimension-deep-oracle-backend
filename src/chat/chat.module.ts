import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatMessage } from './entities/chat-message.entity';
import { DailyReading } from '../decision/entities/daily-reading.entity';
import { Decision } from '../decision/entities/decision.entity';
import { DeepSeekModule } from '../deepseek/deepseek.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessage, DailyReading, Decision]),
    DeepSeekModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
