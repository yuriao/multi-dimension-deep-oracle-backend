import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  async sendMessage(@Request() req, @Body() sendMessageDto: SendMessageDto) {
    // Check if user has premium access
    if (req.user.tier !== 'premium' && req.user.tier !== 'admin') {
      throw new ForbiddenException({
        message: 'This is a premium feature. Please upgrade to continue.',
        requiresUpgrade: true,
      });
    }

    const result = await this.chatService.sendMessage(
      req.user.id,
      sendMessageDto.reading_id,
      sendMessageDto.reading_type,
      sendMessageDto.message,
    );

    return {
      message: result.assistantMessage.content,
      messageId: result.assistantMessage.id,
    };
  }

  @Get('history/:readingId')
  async getChatHistory(@Request() req, @Param('readingId') readingId: string) {
    return this.chatService.getChatHistory(req.user.id, readingId);
  }
}
