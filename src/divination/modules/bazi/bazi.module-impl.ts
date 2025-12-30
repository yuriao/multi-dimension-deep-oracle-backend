import { Injectable } from '@nestjs/common';
import {
  IDivinationModule,
  DailyReading,
  DecisionReading,
  FactorVector,
} from '../../common/divination-module.interface';
import { UserProfile } from '../../../user/entities/user-profile.entity';

// Bazi Constants
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const STEM_ELEMENTS: Record<string, string> = {
  '甲': 'Wood', '乙': 'Wood',
  '丙': 'Fire', '丁': 'Fire',
  '戊': 'Earth', '己': 'Earth',
  '庚': 'Metal', '辛': 'Metal',
  '壬': 'Water', '癸': 'Water'
};

const ELEMENT_RELATIONSHIPS = {
  Wood: { generates: 'Fire', controls: 'Earth' },
  Fire: { generates: 'Earth', controls: 'Metal' },
  Earth: { generates: 'Metal', controls: 'Water' },
  Metal: { generates: 'Water', controls: 'Wood' },
  Water: { generates: 'Wood', controls: 'Fire' }
};

type TenGod = 'Friend' | 'Output' | 'Wealth' | 'Officer' | 'Resource';

@Injectable()
export class BaZiModule implements IDivinationModule {
  getName(): string {
    return 'bazi';
  }

  async computeDailyReading(
    userProfile: UserProfile,
    date: Date,
  ): Promise<DailyReading> {
    // 1. Determine User's Day Master (The "Self")
    const birthDate = userProfile.birth_date ? new Date(userProfile.birth_date) : new Date(); // Fallback if no DOB
    const userDayPillar = this.calculatePillar(birthDate);
    const dayMasterStem = userDayPillar.charAt(0);
    const dayMasterElement = STEM_ELEMENTS[dayMasterStem];

    // 2. Determine Today's Energy
    const currentDayPillar = this.calculatePillar(date);
    const currentStem = currentDayPillar.charAt(0);
    const currentElement = STEM_ELEMENTS[currentStem];

    // 3. Calculate the "Ten God" Relationship
    const relationship = this.getTenGodRelationship(dayMasterElement, currentElement);

    // 4. Generate Factor Vector based on Relationship
    const vector = this.getVectorFromRelationship(relationship);

    return {
      vector,
      confidence: 0.85, // Higher confidence as it is personalized
      explanation: `Your Day Master is ${dayMasterElement} (${dayMasterStem}). Today is a ${currentElement} Day (${currentStem}). This creates a "${relationship}" energy structure.`,
      details: {
        dayPillar: currentDayPillar,
        element: currentElement,
        interaction: relationship,
        luckyColors: this.getLuckyColors(dayMasterElement), // Lucky colors support the Day Master
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
    const userPillar = this.calculatePillar(birthDate);
    const dayMasterElement = STEM_ELEMENTS[userPillar.charAt(0)];

    // For decision making, we simulate Option A as "Wood" energy and Option B as "Metal" energy
    // In a full implementation, we would NLP the options to assign elements dynamically.
    const optionAElement = 'Wood';
    const optionBElement = 'Metal';

    const relationA = this.getTenGodRelationship(dayMasterElement, optionAElement);
    const relationB = this.getTenGodRelationship(dayMasterElement, optionBElement);

    return {
      optionA: {
        vector: this.getVectorFromRelationship(relationA),
        confidence: 0.75,
        explanation: `This option carries Wood energy, acting as your ${relationA}. ${this.getRelationshipAdvice(relationA)}`,
        details: { element: optionAElement, interaction: relationA },
      },
      optionB: {
        vector: this.getVectorFromRelationship(relationB),
        confidence: 0.75,
        explanation: `This option carries Metal energy, acting as your ${relationB}. ${this.getRelationshipAdvice(relationB)}`,
        details: { element: optionBElement, interaction: relationB },
      },
      comparison: `As a ${dayMasterElement} person, you face a choice between ${relationA} (Growth) and ${relationB} (Structure).`,
    };
  }

  // --- Core Calculation Logic ---

  /**
   * Calculates the GanZhi (Pillar) for a specific date.
   * Uses Jan 1, 1900 (Reference: Jia Xu day) as the anchor.
   */
  private calculatePillar(date: Date): string {
    const refDate = new Date(1900, 0, 1); // Jan 1, 1900
    // Calculate days difference. 86400000 ms per day.
    // We use Math.floor to ignore time of day, focusing on the date itself.
    const timeDiff = date.getTime() - refDate.getTime();
    const dayOffset = Math.floor(timeDiff / 86400000);
    
    // 1900-01-01 was Jia Xu (10, 10). 
    // Jia is index 0 in Stems. Xu is index 10 in Branches.
    // Offset must be added to the base index.
    
    // Formula: (ReferenceIndex + DayOffset) % Modulo
    // Adjust for negative dates (pre-1900) if necessary, but assuming post-1900 here.
    const stemIndex = (0 + dayOffset) % 10; 
    const branchIndex = (10 + dayOffset) % 12;

    // Handle Javascript negative modulo bug for pre-1900 dates just in case
    const normalizedStemIndex = stemIndex < 0 ? stemIndex + 10 : stemIndex;
    const normalizedBranchIndex = branchIndex < 0 ? branchIndex + 12 : branchIndex;

    return `${HEAVENLY_STEMS[normalizedStemIndex]}${EARTHLY_BRANCHES[normalizedBranchIndex]}`;
  }

  /**
   * Determines the "Ten God" relationship between the User (Day Master) and the Environment (Target).
   */
  private getTenGodRelationship(dayMaster: string, target: string): TenGod {
    if (dayMaster === target) return 'Friend'; // Same Element
    if (ELEMENT_RELATIONSHIPS[dayMaster].generates === target) return 'Output'; // DM produces Target
    if (ELEMENT_RELATIONSHIPS[target].generates === dayMaster) return 'Resource'; // Target produces DM
    if (ELEMENT_RELATIONSHIPS[dayMaster].controls === target) return 'Wealth'; // DM controls Target
    if (ELEMENT_RELATIONSHIPS[target].controls === dayMaster) return 'Officer'; // Target controls DM
    return 'Friend'; // Fallback
  }

  /**
   * Translates the Ten God relationship into the FactorVector used by the frontend.
   */
  private getVectorFromRelationship(relation: TenGod): FactorVector {
    switch (relation) {
      case 'Friend': // Peers, Networking, Competition
        return { stability: 0.6, change: 0.4, risk: 0.4, safety: 0.6, innerGrowth: 0.5, externalReward: 0.5, emotionalIntensity: 0.6, socialConnection: 0.9 };
      case 'Output': // Creativity, Expression, Exhausting the self
        return { stability: 0.3, change: 0.9, risk: 0.7, safety: 0.2, innerGrowth: 0.8, externalReward: 0.6, emotionalIntensity: 0.8, socialConnection: 0.7 };
      case 'Wealth': // Results, Profit, Control over outcome
        return { stability: 0.5, change: 0.7, risk: 0.6, safety: 0.4, innerGrowth: 0.4, externalReward: 1.0, emotionalIntensity: 0.7, socialConnection: 0.5 };
      case 'Officer': // Authority, Discipline, Pressure
        return { stability: 0.8, change: 0.2, risk: 0.3, safety: 0.7, innerGrowth: 0.7, externalReward: 0.8, emotionalIntensity: 0.9, socialConnection: 0.4 };
      case 'Resource': // Support, Education, Comfort
        return { stability: 0.9, change: 0.1, risk: 0.1, safety: 1.0, innerGrowth: 0.9, externalReward: 0.3, emotionalIntensity: 0.4, socialConnection: 0.5 };
    }
  }

  private getRelationshipAdvice(relation: TenGod): string {
    const map: Record<TenGod, string> = {
      'Friend': 'Connect with peers. A good time for networking but watch out for competition.',
      'Output': 'Express yourself. Your creativity is high, but avoid burnout.',
      'Wealth': 'Focus on results. Opportunities for gain are present if you take action.',
      'Officer': 'Follow the rules. Discipline brings rewards; chaos brings trouble.',
      'Resource': 'Rest and learn. Seek support from mentors and recharge your energy.',
    };
    return map[relation];
  }

  private getLuckyColors(element: string): string[] {
    const colors: Record<string, string[]> = {
      Wood: ['Green', 'Teal'],
      Fire: ['Red', 'Purple'],
      Earth: ['Yellow', 'Brown'],
      Metal: ['White', 'Gold'],
      Water: ['Black', 'Blue'],
    };
    return colors[element] || ['White'];
  }
}