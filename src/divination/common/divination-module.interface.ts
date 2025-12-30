import { UserProfile } from '../../user/entities/user-profile.entity';

// 8-dimensional guidance space
export interface FactorVector {
  stability: number; // 0: Maintaining status quo
  change: number; // 1: Transformation, new beginnings
  risk: number; // 2: Potential for loss, danger
  safety: number; // 3: Protection, cautious approach
  innerGrowth: number; // 4: Personal development, spiritual learning
  externalReward: number; // 5: Material gain, recognition
  emotionalIntensity: number; // 6: Depth of feeling, passion
  socialConnection: number; // 7: Relationships, community
}

export interface DivinationReading {
  vector: FactorVector;
  confidence: number; // 0-1
  explanation: string;
  details: Record<string, any>;
}

export interface DailyReading extends DivinationReading {
  lucky_elements?: string[];
  warnings?: string[];
}

export interface DecisionReading {
  optionA: DivinationReading;
  optionB: DivinationReading;
  comparison: string;
}

export interface IDivinationModule {
  getName(): string;
  computeDailyReading(
    userProfile: UserProfile,
    date: Date,
  ): Promise<DailyReading>;
  computeDecisionReading(
    userProfile: UserProfile,
    question: string,
    optionA: string,
    optionB: string,
  ): Promise<DecisionReading>;
}
