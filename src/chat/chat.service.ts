import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { DailyReading } from '../decision/entities/daily-reading.entity';
import { Decision } from '../decision/entities/decision.entity';
import { DeepSeekService } from '../deepseek/deepseek.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    @InjectRepository(DailyReading)
    private dailyReadingRepository: Repository<DailyReading>,
    @InjectRepository(Decision)
    private decisionRepository: Repository<Decision>,
    private deepSeekService: DeepSeekService,
  ) {}

  async sendMessage(
    userId: string,
    readingId: string,
    readingType: 'DAILY' | 'DECISION',
    message: string,
  ): Promise<{ userMessage: ChatMessage; assistantMessage: ChatMessage }> {
    // Save user message
    const userMessage = this.chatMessageRepository.create({
      user_id: userId,
      reading_id: readingId,
      reading_type: readingType,
      role: 'user',
      content: message,
    });
    await this.chatMessageRepository.save(userMessage);

    // Get reading context
    const readingContext = await this.getReadingContext(
      readingId,
      readingType,
    );

    // Get chat history
    const history = await this.getChatHistory(userId, readingId);

    // Build conversation messages for DeepSeek
    const messages: Array<{
      role: 'system' | 'user' | 'assistant';
      content: string;
    }> = [
      {
        role: 'system' as const,
        content: readingContext,
      },
    ];

    // Add previous conversation history (excluding the message we just saved)
    history.slice(0, -1).forEach((msg) => {
      messages.push({
        role: (msg.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.content,
      });
    });

    // Add current user message
    messages.push({
      role: 'user' as const,
      content: message,
    });

    // Get AI response from DeepSeek
    const aiResponse = await this.deepSeekService.chatCompletion(messages);

    // Save assistant message
    const assistantMessage = this.chatMessageRepository.create({
      user_id: userId,
      reading_id: readingId,
      reading_type: readingType,
      role: 'assistant',
      content: aiResponse,
    });
    await this.chatMessageRepository.save(assistantMessage);

    return { userMessage, assistantMessage };
  }

  async getChatHistory(
    userId: string,
    readingId: string,
  ): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({
      where: {
        user_id: userId,
        reading_id: readingId,
      },
      order: {
        created_at: 'ASC',
      },
    });
  }

  private async getReadingContext(
    readingId: string,
    readingType: 'DAILY' | 'DECISION',
  ): Promise<string> {
    if (readingType === 'DAILY') {
      const reading = await this.dailyReadingRepository.findOne({
        where: { id: readingId },
      });

      if (!reading) {
        throw new NotFoundException('Reading not found');
      }

      const techniqueContributions =
        typeof reading.technique_contributions === 'string'
          ? JSON.parse(reading.technique_contributions)
          : reading.technique_contributions;

      const combinedVector =
        typeof reading.combined_vector === 'string'
          ? JSON.parse(reading.combined_vector)
          : reading.combined_vector;

      return `You are a mystical oracle who has just provided this daily reading:

**Date**: ${reading.reading_date}
**Overall Score**: ${reading.overall_score}/100
**Dominant Dimension**: ${reading.dominant_dimension}

**Enhanced Reading**:
${reading.deepseek_reading}

**Narrative**:
${reading.narrative_text}

**Oracle Contributions**:
${Object.entries(techniqueContributions)
  .map(
    ([technique, data]: [string, any]) =>
      `- ${technique.toUpperCase()}: ${data.explanation}`,
  )
  .join('\n')}

**Energy Vector**:
${Object.entries(combinedVector)
  .map(([dim, val]) => `- ${dim}: ${Math.round((val as number) * 100)}%`)
  .join('\n')}

Now the user wants to chat with you about this reading. Respond in a mystical, wise, and compassionate tone.
Help them understand the reading better, answer their questions, and provide guidance based on the divination results.
Remember all previous messages in the conversation and maintain context.`;
    } else {
      const decision = await this.decisionRepository.findOne({
        where: { id: readingId },
      });

      if (!decision) {
        throw new NotFoundException('Decision not found');
      }

      const techniqueReadings =
        typeof decision.technique_readings === 'string'
          ? JSON.parse(decision.technique_readings)
          : decision.technique_readings;

      return `You are a mystical oracle who has just helped with this decision:

**Question**: ${decision.question}
**Option A**: ${decision.option_a}
**Option B**: ${decision.option_b}

**Recommendation**: ${decision.recommended_option}
**Confidence**: ${Math.round(decision.confidence_score * 100)}%

**Guidance**:
${decision.combined_summary_text}

**Oracle Insights**:
${Object.entries(techniqueReadings)
  .map(
    ([technique, data]: [string, any]) =>
      `- ${technique.toUpperCase()}: ${data.explanation}`,
  )
  .join('\n')}

Now the user wants to discuss this decision with you. Respond in a mystical, wise, and compassionate tone.
Help them understand the guidance better and explore their decision from different angles.
Remember all previous messages in the conversation and maintain context.`;
    }
  }
}
