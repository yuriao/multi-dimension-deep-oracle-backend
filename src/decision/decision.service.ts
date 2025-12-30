import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Decision, DecisionCategory } from './entities/decision.entity';
import { DailyReading } from './entities/daily-reading.entity';
import { DivinationService } from '../divination/divination.service';
import { UserService } from '../user/user.service';
import { ContentService } from '../content/content.service';
import { DeepSeekService } from '../deepseek/deepseek.service';
import { CreateDecisionDto } from './dto/create-decision.dto';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class DecisionService {
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

  async createDecision(
    userId: string,
    createDecisionDto: CreateDecisionDto,
  ): Promise<Decision> {
    const userProfile = await this.userService.getProfile(userId);

    // Compute divination readings
    const result = await this.divinationService.computeCombinedDecisionReading(
      userProfile,
      createDecisionDto.question,
      createDecisionDto.option_a,
      createDecisionDto.option_b,
      createDecisionDto.enabled_techniques,
    );

    // Generate narrative
    const narrative = await this.contentService.generateDecisionNarrative(
      createDecisionDto.question,
      createDecisionDto.option_a,
      createDecisionDto.option_b,
      result.recommendation,
      result.confidence,
      result.technique_readings,
    );

    // Create decision record
    const decision = this.decisionRepository.create({
      user_id: userId,
      category: createDecisionDto.category,
      question: createDecisionDto.question,
      option_a: createDecisionDto.option_a,
      option_b: createDecisionDto.option_b,
      combined_guidance_vector: JSON.stringify({
        optionA: result.optionA_vector,
        optionB: result.optionB_vector,
      }),
      recommended_option: result.recommendation as any,
      confidence_score: result.confidence,
      combined_summary_text: narrative,
      technique_readings: JSON.stringify(result.technique_readings),
    });

    return this.decisionRepository.save(decision);
  }

  async getDecision(userId: string, decisionId: string): Promise<Decision> {
    const decision = await this.decisionRepository.findOne({
      where: { id: decisionId, user_id: userId, is_deleted: false },
    });

    if (!decision) {
      throw new NotFoundException('Decision not found');
    }

    // Parse JSON fields
    if (decision.combined_guidance_vector && typeof decision.combined_guidance_vector === 'string') {
      (decision as any).combined_guidance_vector = JSON.parse(decision.combined_guidance_vector);
    }
    if (decision.technique_readings && typeof decision.technique_readings === 'string') {
      (decision as any).technique_readings = JSON.parse(decision.technique_readings);
    }

    return decision;
  }

  async getUserDecisions(
    userId: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<Decision[]> {
    const decisions = await this.decisionRepository.find({
      where: { user_id: userId, is_deleted: false },
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
    });

    // Parse JSON fields for all decisions
    return decisions.map(decision => {
      if (decision.combined_guidance_vector && typeof decision.combined_guidance_vector === 'string') {
        (decision as any).combined_guidance_vector = JSON.parse(decision.combined_guidance_vector);
      }
      if (decision.technique_readings && typeof decision.technique_readings === 'string') {
        (decision as any).technique_readings = JSON.parse(decision.technique_readings);
      }
      return decision;
    });
  }

  async submitFeedback(
    userId: string,
    decisionId: string,
    feedbackDto: FeedbackDto,
  ): Promise<Decision> {
    const decision = await this.getDecision(userId, decisionId);

    decision.user_choice = feedbackDto.choice;
    decision.user_rating = feedbackDto.rating;
    decision.user_feedback = feedbackDto.feedback;

    return this.decisionRepository.save(decision);
  }

  async deleteDecision(userId: string, decisionId: string): Promise<void> {
    const decision = await this.getDecision(userId, decisionId);
    decision.is_deleted = true;
    await this.decisionRepository.save(decision);
  }

  async getTodayReading(userId: string, date?: Date): Promise<DailyReading> {
    const targetDate = date || new Date();
    targetDate.setHours(0, 0, 0, 0);

    // Check cache
    let reading = await this.dailyReadingRepository.findOne({
      where: {
        user_id: userId,
        reading_date: targetDate.toISOString().split('T')[0],
      },
    });

    if (reading) {
      // Parse JSON fields
      try {
        if (typeof reading.combined_vector === 'string') {
          (reading as any).combined_vector = JSON.parse(reading.combined_vector);
        }
      } catch (error) {
        console.error('Failed to parse combined_vector:', reading.combined_vector);
        throw new Error(`Invalid JSON in combined_vector: ${error.message}`);
      }

      try {
        if (typeof reading.technique_contributions === 'string') {
          (reading as any).technique_contributions = JSON.parse(reading.technique_contributions);
        }
      } catch (error) {
        console.error('Failed to parse technique_contributions:', reading.technique_contributions);
        throw new Error(`Invalid JSON in technique_contributions: ${error.message}`);
      }

      try {
        if (reading.lucky_times && typeof reading.lucky_times === 'string') {
          // Convert PostgreSQL array format {a,b,c} to JSON array format ["a","b","c"]
          let luckyTimesStr = reading.lucky_times;
          if (luckyTimesStr.startsWith('{') && luckyTimesStr.endsWith('}')) {
            luckyTimesStr = '[' + luckyTimesStr.slice(1, -1).split(',').map(s => `"${s}"`).join(',') + ']';
          }
          (reading as any).lucky_times = JSON.parse(luckyTimesStr);
        }
      } catch (error) {
        console.error('Failed to parse lucky_times:', reading.lucky_times);
        throw new Error(`Invalid JSON in lucky_times: ${error.message}`);
      }

      // Backfill DeepSeek reading if missing
      if (!reading.deepseek_reading) {
        try {
          const deepseekReading = await this.deepSeekService.generateEnhancedReading(
            (reading as any).technique_contributions,
            (reading as any).combined_vector,
          );
          reading.deepseek_reading = deepseekReading;
          await this.dailyReadingRepository.save(reading);
        } catch (error) {
          console.error('Failed to generate DeepSeek reading:', error);
          // Continue without DeepSeek reading rather than failing
        }
      }

      return reading;
    }

    // Generate new reading
    const userProfile = await this.userService.getProfile(userId);
    const result = await this.divinationService.computeCombinedDailyReading(
      userProfile,
      targetDate,
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

    // Save to database
    reading = this.dailyReadingRepository.create({
      user_id: userId,
      reading_date: targetDate.toISOString().split('T')[0],
      combined_vector: JSON.stringify(result.combined_vector),
      overall_score: result.overall_score,
      dominant_dimension: result.dominant_dimension,
      narrative_text: narrative,
      technique_contributions: JSON.stringify(result.technique_contributions),
      lucky_times: JSON.stringify(this.generateLuckyTimes(result.combined_vector)),
      deepseek_reading: deepseekReading,
    });

    return this.dailyReadingRepository.save(reading);
  }

  private generateLuckyTimes(vector: any): string[] {
    // Simplified - would use more sophisticated calculations in production
    return ['09:00-11:00', '14:00-16:00', '19:00-21:00'];
  }
}
