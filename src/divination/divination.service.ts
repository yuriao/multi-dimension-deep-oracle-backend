import { Injectable } from '@nestjs/common';
import { UserProfile } from '../user/entities/user-profile.entity';
import {
  IDivinationModule,
  FactorVector,
  DailyReading,
  DecisionReading,
} from './common/divination-module.interface';
import { TarotModule } from './modules/tarot/tarot.module-impl';
import { AstrologyModule } from './modules/astrology/astrology.module-impl';
import { NumerologyModule } from './modules/numerology/numerology.module-impl';
import { IChingModule } from './modules/iching/iching.module-impl';
import { BaZiModule } from './modules/bazi/bazi.module-impl';
import { ZiWeiModule } from './modules/ziwei/ziwei.module-impl';

@Injectable()
export class DivinationService {
  private modules: Map<string, IDivinationModule> = new Map();

  constructor(
    private tarotModule: TarotModule,
    private astrologyModule: AstrologyModule,
    private numerologyModule: NumerologyModule,
    private ichingModule: IChingModule,
    private baziModule: BaZiModule,
    private ziweiModule: ZiWeiModule,
  ) {
    // Register all modules
    this.modules.set('tarot', tarotModule);
    this.modules.set('astrology', astrologyModule);
    this.modules.set('numerology', numerologyModule);
    this.modules.set('iching', ichingModule);
    this.modules.set('bazi', baziModule);
    this.modules.set('ziwei', ziweiModule);
  }

  async computeCombinedDailyReading(
    userProfile: UserProfile,
    date: Date,
    enabledTechniques?: string[],
  ): Promise<{
    combined_vector: FactorVector;
    overall_score: number;
    dominant_dimension: string;
    technique_contributions: Record<string, DailyReading>;
  }> {
    const defaultTechniques = [
      'tarot',
      'astrology',
      'numerology',
      'iching',
      'bazi',
      'ziwei',
    ];

    let profileTechniques = defaultTechniques;
    if (userProfile.enabled_techniques) {
      profileTechniques = typeof userProfile.enabled_techniques === 'string'
        ? JSON.parse(userProfile.enabled_techniques)
        : userProfile.enabled_techniques;
    }

    const techniques = enabledTechniques || profileTechniques;

    const readings: Record<string, DailyReading> = {};
    const vectors: FactorVector[] = [];
    const weights: number[] = [];

    // Execute all enabled modules
    for (const technique of techniques) {
      const module = this.modules.get(technique);
      if (module) {
        const reading = await module.computeDailyReading(userProfile, date);
        readings[technique] = reading;
        vectors.push(reading.vector);
        weights.push(reading.confidence);
      }
    }

    // Aggregate vectors
    const combined_vector = this.aggregateVectors(vectors, weights);
    const userWeights = (typeof userProfile.preference_weights === 'string'
      ? JSON.parse(userProfile.preference_weights)
      : userProfile.preference_weights) || this.getDefaultWeights();
    const overall_score = this.calculateOverallScore(combined_vector, userWeights);
    const dominant_dimension = this.getDominantDimension(combined_vector);

    return {
      combined_vector,
      overall_score,
      dominant_dimension,
      technique_contributions: readings,
    };
  }

  async computeCombinedDecisionReading(
    userProfile: UserProfile,
    question: string,
    optionA: string,
    optionB: string,
    enabledTechniques?: string[],
  ): Promise<{
    optionA_vector: FactorVector;
    optionB_vector: FactorVector;
    recommendation: 'A' | 'B' | 'neutral' | 'wait';
    confidence: number;
    technique_readings: Record<string, DecisionReading>;
  }> {
    const defaultTechniques = [
      'tarot',
      'astrology',
      'numerology',
      'iching',
      'bazi',
      'ziwei',
    ];

    let profileTechniques = defaultTechniques;
    if (userProfile.enabled_techniques) {
      profileTechniques = typeof userProfile.enabled_techniques === 'string'
        ? JSON.parse(userProfile.enabled_techniques)
        : userProfile.enabled_techniques;
    }

    const techniques = enabledTechniques || profileTechniques;

    const readings: Record<string, DecisionReading> = {};
    const vectorsA: FactorVector[] = [];
    const vectorsB: FactorVector[] = [];
    const weights: number[] = [];

    // Execute all enabled modules
    for (const technique of techniques) {
      const module = this.modules.get(technique);
      if (module) {
        const reading = await module.computeDecisionReading(
          userProfile,
          question,
          optionA,
          optionB,
        );
        readings[technique] = reading;
        vectorsA.push(reading.optionA.vector);
        vectorsB.push(reading.optionB.vector);
        weights.push((reading.optionA.confidence + reading.optionB.confidence) / 2);
      }
    }

    // Aggregate vectors for both options
    const optionA_vector = this.aggregateVectors(vectorsA, weights);
    const optionB_vector = this.aggregateVectors(vectorsB, weights);

    // Calculate scores and recommendation
    const userWeights = (typeof userProfile.preference_weights === 'string'
      ? JSON.parse(userProfile.preference_weights)
      : userProfile.preference_weights) || this.getDefaultWeights();
    const scoreA = this.calculateOverallScore(optionA_vector, userWeights);
    const scoreB = this.calculateOverallScore(optionB_vector, userWeights);

    const { recommendation, confidence } = this.determineRecommendation(
      scoreA,
      scoreB,
    );

    return {
      optionA_vector,
      optionB_vector,
      recommendation,
      confidence,
      technique_readings: readings,
    };
  }

  private aggregateVectors(
    vectors: FactorVector[],
    weights: number[],
  ): FactorVector {
    if (vectors.length === 0) {
      return this.getEmptyVector();
    }

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const result: FactorVector = this.getEmptyVector();

    vectors.forEach((vector, index) => {
      const weight = weights[index] / totalWeight;
      Object.keys(vector).forEach((key) => {
        result[key] += vector[key] * weight;
      });
    });

    // Normalize to 0-1 range
    Object.keys(result).forEach((key) => {
      result[key] = Math.max(0, Math.min(1, result[key]));
    });

    return result;
  }

  private calculateOverallScore(
    vector: FactorVector,
    userWeights: Record<string, number>,
  ): number {
    let score = 0;
    let totalWeight = 0;

    Object.keys(vector).forEach((key) => {
      const weight = userWeights[key] || 0.5;
      score += vector[key] * weight;
      totalWeight += weight;
    });

    return (score / totalWeight) * 100;
  }

  private getDominantDimension(vector: FactorVector): string {
    let maxValue = 0;
    let maxKey = 'stability';

    Object.keys(vector).forEach((key) => {
      if (vector[key] > maxValue) {
        maxValue = vector[key];
        maxKey = key;
      }
    });

    return maxKey;
  }

  private determineRecommendation(
    scoreA: number,
    scoreB: number,
  ): { recommendation: 'A' | 'B' | 'neutral' | 'wait'; confidence: number } {
    const diff = Math.abs(scoreA - scoreB);
    const threshold = 10; // 10-point difference for clear recommendation

    if (diff < threshold) {
      return { recommendation: 'neutral', confidence: 50 };
    }

    if (scoreA > scoreB) {
      return { recommendation: 'A', confidence: Math.min(95, 50 + diff) };
    } else {
      return { recommendation: 'B', confidence: Math.min(95, 50 + diff) };
    }
  }

  private getEmptyVector(): FactorVector {
    return {
      stability: 0,
      change: 0,
      risk: 0,
      safety: 0,
      innerGrowth: 0,
      externalReward: 0,
      emotionalIntensity: 0,
      socialConnection: 0,
    };
  }

  private getDefaultWeights(): Record<string, number> {
    return {
      stability: 0.5,
      change: 0.5,
      risk: 0.3,
      safety: 0.7,
      innerGrowth: 0.6,
      externalReward: 0.6,
      emotionalIntensity: 0.5,
      socialConnection: 0.6,
    };
  }
}
