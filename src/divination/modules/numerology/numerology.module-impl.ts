import { Injectable } from '@nestjs/common';
import {
  IDivinationModule,
  DailyReading,
  DecisionReading,
  FactorVector,
} from '../../common/divination-module.interface';
import { UserProfile } from '../../../user/entities/user-profile.entity';

@Injectable()
export class NumerologyModule implements IDivinationModule {
  getName(): string {
    return 'numerology';
  }

  async computeDailyReading(
    userProfile: UserProfile,
    date: Date,
  ): Promise<DailyReading> {
    const birthDate = userProfile.birth_date ? new Date(userProfile.birth_date) : new Date();
    const personalDay = this.calculatePersonalDay(birthDate, date);
    const vector = this.numberToVector(personalDay);

    return {
      vector,
      confidence: 0.7,
      explanation: `Your Personal Day Number is ${personalDay}: ${this.getNumberMeaning(personalDay)}`,
      details: {
        personalDay,
        meaning: this.getNumberMeaning(personalDay),
      },
    };
  }

  async computeDecisionReading(
    userProfile: UserProfile,
    question: string,
    optionA: string,
    optionB: string,
  ): Promise<DecisionReading> {
    const birthDate = userProfile.birth_date ? new Date(userProfile.birth_date) : new Date();
    const lifePathNumber = this.calculateLifePath(birthDate);
    const questionNumber = this.calculateNameNumber(question);

    const numberA = this.reduceNumber((lifePathNumber + this.calculateNameNumber(optionA) + questionNumber) % 10);
    const numberB = this.reduceNumber((lifePathNumber + this.calculateNameNumber(optionB) + questionNumber) % 10);

    return {
      optionA: {
        vector: this.numberToVector(numberA),
        confidence: 0.65,
        explanation: `Option A resonates with number ${numberA}`,
        details: { number: numberA, meaning: this.getNumberMeaning(numberA) },
      },
      optionB: {
        vector: this.numberToVector(numberB),
        confidence: 0.65,
        explanation: `Option B resonates with number ${numberB}`,
        details: { number: numberB, meaning: this.getNumberMeaning(numberB) },
      },
      comparison: `Your Life Path ${lifePathNumber} guides this choice`,
    };
  }

  private calculateLifePath(birthDate: Date | null): number {
    if (!birthDate) return 5; // Default neutral number

    const date = new Date(birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this.reduceNumber(day + month + year);
  }

  private calculatePersonalDay(birthDate: Date | null, currentDate: Date): number {
    if (!birthDate) return 5;

    const lifePath = this.calculateLifePath(birthDate);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const personalYear = this.reduceNumber(day + month + year);
    const currentDay = currentDate.getDate();

    return this.reduceNumber(lifePath + personalYear + currentDay);
  }

  private calculateNameNumber(text: string): number {
    const values = {
      a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
      j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
      s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
    };

    let sum = 0;
    for (const char of text.toLowerCase()) {
      if (values[char]) {
        sum += values[char];
      }
    }

    return this.reduceNumber(sum);
  }

  private reduceNumber(num: number): number {
    // Reduce to single digit or master number (11, 22, 33)
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split('')
        .reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
  }

  private numberToVector(num: number): FactorVector {
    const vectors: Record<number, FactorVector> = {
      1: { stability: 0.5, change: 0.8, risk: 0.6, safety: 0.4, innerGrowth: 0.7, externalReward: 0.8, emotionalIntensity: 0.7, socialConnection: 0.4 },
      2: { stability: 0.7, change: 0.4, risk: 0.3, safety: 0.7, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.8, socialConnection: 0.9 },
      3: { stability: 0.4, change: 0.8, risk: 0.4, safety: 0.6, innerGrowth: 0.7, externalReward: 0.7, emotionalIntensity: 0.9, socialConnection: 0.8 },
      4: { stability: 0.9, change: 0.3, risk: 0.2, safety: 0.8, innerGrowth: 0.5, externalReward: 0.7, emotionalIntensity: 0.4, socialConnection: 0.6 },
      5: { stability: 0.3, change: 0.9, risk: 0.7, safety: 0.3, innerGrowth: 0.8, externalReward: 0.6, emotionalIntensity: 0.7, socialConnection: 0.7 },
      6: { stability: 0.7, change: 0.4, risk: 0.3, safety: 0.8, innerGrowth: 0.6, externalReward: 0.6, emotionalIntensity: 0.8, socialConnection: 0.9 },
      7: { stability: 0.6, change: 0.5, risk: 0.3, safety: 0.7, innerGrowth: 0.9, externalReward: 0.4, emotionalIntensity: 0.6, socialConnection: 0.3 },
      8: { stability: 0.8, change: 0.6, risk: 0.5, safety: 0.5, innerGrowth: 0.6, externalReward: 0.9, emotionalIntensity: 0.6, socialConnection: 0.7 },
      9: { stability: 0.5, change: 0.7, risk: 0.4, safety: 0.6, innerGrowth: 0.9, externalReward: 0.5, emotionalIntensity: 0.8, socialConnection: 0.8 },
      11: { stability: 0.4, change: 0.8, risk: 0.5, safety: 0.5, innerGrowth: 0.9, externalReward: 0.7, emotionalIntensity: 0.9, socialConnection: 0.7 },
      22: { stability: 0.8, change: 0.8, risk: 0.4, safety: 0.6, innerGrowth: 0.8, externalReward: 0.9, emotionalIntensity: 0.7, socialConnection: 0.8 },
      33: { stability: 0.7, change: 0.7, risk: 0.3, safety: 0.7, innerGrowth: 0.9, externalReward: 0.6, emotionalIntensity: 0.9, socialConnection: 0.9 },
    };

    return vectors[num] || vectors[5];
  }

  private getNumberMeaning(num: number): string {
    const meanings: Record<number, string> = {
      1: 'Leadership, independence, new beginnings',
      2: 'Balance, partnership, diplomacy',
      3: 'Creativity, expression, joy',
      4: 'Stability, hard work, foundation',
      5: 'Freedom, change, adventure',
      6: 'Harmony, responsibility, nurturing',
      7: 'Spirituality, introspection, wisdom',
      8: 'Power, abundance, material success',
      9: 'Completion, humanitarianism, wisdom',
      11: 'Intuition, inspiration, spiritual insight',
      22: 'Master builder, manifesting dreams',
      33: 'Master teacher, compassion, healing',
    };

    return meanings[num] || meanings[5];
  }
}
