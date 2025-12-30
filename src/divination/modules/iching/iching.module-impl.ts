import { Injectable } from '@nestjs/common';
import {
  IDivinationModule,
  DailyReading,
  DecisionReading,
  FactorVector,
} from '../../common/divination-module.interface';
import { UserProfile } from '../../../user/entities/user-profile.entity';

@Injectable()
export class IChingModule implements IDivinationModule {
  getName(): string {
    return 'iching';
  }

  async computeDailyReading(
    userProfile: UserProfile,
    date: Date,
  ): Promise<DailyReading> {
    const hexagram = this.generateHexagram(date.toISOString() + userProfile.user_id);
    const vector = this.hexagramToVector(hexagram);

    return {
      vector,
      confidence: 0.75,
      explanation: `Hexagram ${hexagram}: ${this.getHexagramName(hexagram)} - ${this.getHexagramMeaning(hexagram)}`,
      details: {
        hexagram,
        name: this.getHexagramName(hexagram),
        judgment: this.getHexagramMeaning(hexagram),
      },
    };
  }

  async computeDecisionReading(
    userProfile: UserProfile,
    question: string,
    optionA: string,
    optionB: string,
  ): Promise<DecisionReading> {
    const hexA = this.generateHexagram(question + optionA + userProfile.user_id);
    const hexB = this.generateHexagram(question + optionB + userProfile.user_id);

    return {
      optionA: {
        vector: this.hexagramToVector(hexA),
        confidence: 0.8,
        explanation: `Hexagram ${hexA}: ${this.getHexagramName(hexA)}`,
        details: { hexagram: hexA, name: this.getHexagramName(hexA) },
      },
      optionB: {
        vector: this.hexagramToVector(hexB),
        confidence: 0.8,
        explanation: `Hexagram ${hexB}: ${this.getHexagramName(hexB)}`,
        details: { hexagram: hexB, name: this.getHexagramName(hexB) },
      },
      comparison: 'Consult the changing lines for timing',
    };
  }

  private generateHexagram(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return (Math.abs(hash) % 64) + 1;
  }

  private hexagramToVector(hexagram: number): FactorVector {
    // Simplified mapping - in production, use full I Ching interpretations
    const base = {
      stability: 0.5,
      change: 0.5,
      risk: 0.4,
      safety: 0.6,
      innerGrowth: 0.7,
      externalReward: 0.5,
      emotionalIntensity: 0.5,
      socialConnection: 0.6,
    };

    // Modify based on hexagram characteristics
    if (hexagram <= 16) {
      base.change += 0.2;
      base.stability -= 0.1;
    } else if (hexagram <= 32) {
      base.innerGrowth += 0.2;
    } else if (hexagram <= 48) {
      base.externalReward += 0.2;
    } else {
      base.stability += 0.2;
    }

    return base;
  }

  private getHexagramName(hexagram: number): string {
    const names = {
      1: 'The Creative',
      2: 'The Receptive',
      3: 'Difficulty at the Beginning',
      4: 'Youthful Folly',
      // ... simplified set
    };
    return names[hexagram] || `Hexagram ${hexagram}`;
  }

  private getHexagramMeaning(hexagram: number): string {
    return 'Perseverance brings good fortune. Contemplate your path carefully.';
  }
}
