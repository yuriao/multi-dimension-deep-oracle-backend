import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Decision } from '../decision/entities/decision.entity';
import { DailyReading } from '../decision/entities/daily-reading.entity';
import { DivinationService } from '../divination/divination.service';
import { UserService } from '../user/user.service';
import { ContentService } from '../content/content.service';
import { DeepSeekService } from '../deepseek/deepseek.service';
import { InvokeRitualDto } from './dto/invoke-ritual.dto';

@Injectable()
export class RitualService {
  constructor(
    @InjectRepository(Decision)
    private decisionRepository: Repository<Decision>,
    @InjectRepository(DailyReading)
    private dailyReadingRepository: Repository<DailyReading>,
    private divinationService: DivinationService,
    private userService: UserService,
    private contentService: ContentService,
    private deepSeekService: DeepSeekService,
  ) {}

  async invoke(userId: string, invokeDto: InvokeRitualDto) {
    const userProfile = await this.userService.getProfile(userId);

    if (invokeDto.type === 'DAILY') {
      return this.performDailyRitual(userId, userProfile, invokeDto.selected_modules);
    } else if (invokeDto.type === 'QUESTION') {
      if (!invokeDto.text?.trim()) {
        throw new BadRequestException('Question text is required for QUESTION type');
      }
      return this.performQuestionRitual(
        userId,
        userProfile,
        invokeDto.text,
        invokeDto.selected_modules,
      );
    }

    throw new BadRequestException('Invalid ritual type');
  }

  private async performDailyRitual(
    userId: string,
    userProfile: any,
    selectedModules?: string[],
  ) {
    console.log('performDailyRitual called with userId:', userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    // Check if reading already exists
    let reading = await this.dailyReadingRepository.findOne({
      where: { user_id: userId, reading_date: todayStr },
    });

    if (reading) {
      return { reading_id: reading.id, type: 'DAILY' };
    }

    // Generate new daily reading using all six divination methods
    const result = await this.divinationService.computeCombinedDailyReading(
      userProfile,
      today,
      selectedModules || ['tarot', 'astrology', 'numerology', 'iching', 'bazi', 'ziwei'],
    );

    // Generate narrative
    const narrative = await this.contentService.generateDailyNarrative(
      result.dominant_dimension,
      result.combined_vector,
      result.technique_contributions,
    );

    // Generate DeepSeek enhanced reading
    const deepseekReading = await this.deepSeekService.generateEnhancedReading(
      result.technique_contributions,
      result.combined_vector,
    );

    console.log('Creating daily reading with userId:', userId);

    // Save reading
    reading = this.dailyReadingRepository.create({
      user_id: userId,
      reading_date: todayStr,
      combined_vector: JSON.stringify(result.combined_vector),
      overall_score: result.overall_score,
      dominant_dimension: result.dominant_dimension,
      narrative_text: narrative,
      technique_contributions: JSON.stringify(result.technique_contributions),
      lucky_times: JSON.stringify(this.generateLuckyTimes(result.combined_vector)),
      deepseek_reading: deepseekReading,
    });

    console.log('Created reading object:', { id: reading.id, user_id: reading.user_id, reading_date: reading.reading_date });

    const saved = await this.dailyReadingRepository.save(reading);

    return { reading_id: saved.id, type: 'DAILY' };
  }

  private async performQuestionRitual(
    userId: string,
    userProfile: any,
    question: string,
    selectedModules?: string[],
  ) {
    // For a question-based ritual, we create a decision with generic options
    // This allows the six traditions to provide guidance on the question itself
    const result = await this.divinationService.computeCombinedDecisionReading(
      userProfile,
      question,
      'Proceed with this path',
      'Wait or seek alternatives',
      selectedModules || ['tarot', 'astrology', 'numerology', 'iching', 'bazi', 'ziwei'],
    );

    // Generate narrative
    const narrative = await this.contentService.generateDecisionNarrative(
      question,
      'Proceed with this path',
      'Wait or seek alternatives',
      result.recommendation,
      result.confidence,
      result.technique_readings,
    );

    // Create decision record
    const decision = this.decisionRepository.create({
      user_id: userId,
      category: 'other',
      question: question,
      option_a: 'Proceed with this path',
      option_b: 'Wait or seek alternatives',
      combined_guidance_vector: JSON.stringify({
        optionA: result.optionA_vector,
        optionB: result.optionB_vector,
      }),
      recommended_option: result.recommendation as any,
      confidence_score: result.confidence,
      combined_summary_text: narrative,
      technique_readings: JSON.stringify(result.technique_readings),
    });

    const saved = await this.decisionRepository.save(decision);

    return { reading_id: saved.id, type: 'QUESTION' };
  }

  private generateLuckyTimes(vector: any): string[] {
    // Simplified - would use more sophisticated calculations in production
    return ['09:00-11:00', '14:00-16:00', '19:00-21:00'];
  }
}
