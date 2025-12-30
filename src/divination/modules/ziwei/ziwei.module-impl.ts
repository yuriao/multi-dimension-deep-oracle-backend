import { Injectable } from '@nestjs/common';
import {
  IDivinationModule,
  DailyReading,
  DecisionReading,
  FactorVector,
} from '../../common/divination-module.interface';
import { UserProfile } from '../../../user/entities/user-profile.entity';

@Injectable()
export class ZiWeiModule implements IDivinationModule {
  getName(): string {
    return 'ziwei';
  }

  async computeDailyReading(
    userProfile: UserProfile,
    date: Date,
  ): Promise<DailyReading> {
    // Simplified Zi Wei Dou Shu implementation
    const palace = this.getActivePalace(date);
    const vector = this.palaceToVector(palace);

    return {
      vector,
      confidence: 0.75,
      explanation: `Today, the ${palace} palace is activated. ${this.getPalaceAdvice(palace)}`,
      details: {
        activePalace: palace,
        stars: this.getStarsInPalace(palace),
      },
    };
  }

  async computeDecisionReading(
    userProfile: UserProfile,
    question: string,
    optionA: string,
    optionB: string,
  ): Promise<DecisionReading> {
    return {
      optionA: {
        vector: this.palaceToVector('Career'),
        confidence: 0.7,
        explanation: 'The Career palace favors this path',
        details: { dominantPalace: 'Career', stars: ['紫微', '天府'] },
      },
      optionB: {
        vector: this.palaceToVector('Wealth'),
        confidence: 0.7,
        explanation: 'The Wealth palace illuminates this choice',
        details: { dominantPalace: 'Wealth', stars: ['天相', '武曲'] },
      },
      comparison: 'Consider which palace resonates with your true goals',
    };
  }

  private getActivePalace(date: Date): string {
    const palaces = [
      'Life', 'Siblings', 'Spouse', 'Children',
      'Wealth', 'Health', 'Travel', 'Friends',
      'Career', 'Property', 'Fortune', 'Parents',
    ];
    return palaces[date.getDate() % 12];
  }

  private palaceToVector(palace: string): FactorVector {
    const vectors: Record<string, FactorVector> = {
      Life: { stability: 0.6, change: 0.6, risk: 0.4, safety: 0.6, innerGrowth: 0.8, externalReward: 0.6, emotionalIntensity: 0.7, socialConnection: 0.6 },
      Career: { stability: 0.6, change: 0.7, risk: 0.5, safety: 0.5, innerGrowth: 0.6, externalReward: 0.9, emotionalIntensity: 0.5, socialConnection: 0.7 },
      Wealth: { stability: 0.7, change: 0.6, risk: 0.5, safety: 0.5, innerGrowth: 0.5, externalReward: 0.9, emotionalIntensity: 0.4, socialConnection: 0.6 },
      Spouse: { stability: 0.7, change: 0.5, risk: 0.3, safety: 0.7, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.9, socialConnection: 0.9 },
      Health: { stability: 0.8, change: 0.4, risk: 0.3, safety: 0.7, innerGrowth: 0.7, externalReward: 0.5, emotionalIntensity: 0.6, socialConnection: 0.5 },
    };
    return vectors[palace] || vectors['Life'];
  }

  private getPalaceAdvice(palace: string): string {
    const advice: Record<string, string> = {
      Life: 'Focus on personal well-being and self-development',
      Career: 'Professional matters require your attention',
      Wealth: 'Financial opportunities may arise',
      Spouse: 'Relationships and partnerships are highlighted',
      Health: 'Pay attention to your physical and mental wellness',
    };
    return advice[palace] || 'Reflect on this area of life';
  }

  private getStarsInPalace(palace: string): string[] {
    return ['紫微', '天府']; // Simplified
  }
}
