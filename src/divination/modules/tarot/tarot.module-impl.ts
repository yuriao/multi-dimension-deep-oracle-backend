import { Injectable } from '@nestjs/common';
import {
  IDivinationModule,
  DailyReading,
  DecisionReading,
  FactorVector,
} from '../../common/divination-module.interface';
import { UserProfile } from '../../../user/entities/user-profile.entity';
import { TAROT_DECK, TarotCard } from './tarot-deck';

@Injectable()
export class TarotModule implements IDivinationModule {
  getName(): string {
    return 'tarot';
  }

  async computeDailyReading(
    userProfile: UserProfile,
    date: Date,
  ): Promise<DailyReading> {
    // Generate a unique seed for the day per user
    const seed = date.toISOString().split('T')[0] + userProfile.user_id;
    
    // Draw 1 card from a freshly shuffled deck
    const card = this.drawCards(1, seed)[0];

    return {
      vector: this.cardToVector(card, false),
      confidence: 0.75,
      explanation: `Today's card is ${card.name}${card.reversed ? ' (Reversed)' : ''}: ${card.reversed ? card.reversedMeaning : card.uprightMeaning}`,
      details: {
        card: card.name,
        suit: card.suit,
        reversed: card.reversed,
        meaning: card.reversed ? card.reversedMeaning : card.uprightMeaning,
      },
    };
  }

  async computeDecisionReading(
    userProfile: UserProfile,
    question: string,
    optionA: string,
    optionB: string,
  ): Promise<DecisionReading> {
    // Create a master seed for this specific decision event
    // Combining inputs ensures the shuffle is unique to this specific dilemma
    const masterSeed = question + optionA + optionB + userProfile.user_id;

    // Draw 6 cards total from ONE single shuffled deck (3 for A, 3 for B)
    // This ensures no card appears twice across the two options
    const allCards = this.drawCards(6, masterSeed);
    
    const cardsA = allCards.slice(0, 3);
    const cardsB = allCards.slice(3, 6);

    const vectorA = this.combineVectors(cardsA.map((c, i) => this.cardToVector(c, i === 1)));
    const vectorB = this.combineVectors(cardsB.map((c, i) => this.cardToVector(c, i === 1)));

    return {
      optionA: {
        vector: vectorA,
        confidence: 0.8,
        explanation: `${optionA}: ${cardsA.map((c) => c.name).join(', ')}`,
        details: { cards: cardsA },
      },
      optionB: {
        vector: vectorB,
        confidence: 0.8,
        explanation: `${optionB}: ${cardsB.map((c) => c.name).join(', ')}`,
        details: { cards: cardsB },
      },
      comparison: this.compareOptions(cardsA, cardsB),
    };
  }

  /**
   * Simulates a physical deck shuffle using the Fisher-Yates algorithm.
   * This guarantees that every permutation of the deck is equally likely
   * based on the input seed.
   */
  private drawCards(count: number, seed: string): Array<TarotCard & { reversed: boolean }> {
    // 1. Initialize a full deck of indices [0, 1, ... 77]
    const deckIndices = Array.from({ length: TAROT_DECK.length }, (_, i) => i);
    
    // 2. Create a deterministic random number generator from the seed
    const rng = this.seededRandom(seed);

    // 3. Fisher-Yates Shuffle
    // We shuffle the entire deck first to simulate the "ritual" of mixing
    for (let i = deckIndices.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [deckIndices[i], deckIndices[j]] = [deckIndices[j], deckIndices[i]];
    }

    // 4. Draw the top 'count' cards
    const drawnIndices = deckIndices.slice(0, count);

    // 5. Map indices to Card objects and determine Reversal
    return drawnIndices.map(index => {
      // We use the RNG again to determine orientation. 
      // In a physical deck, orientation is determined during the shuffle messiness.
      const isReversed = rng() > 0.5; 
      
      return {
        ...TAROT_DECK[index],
        reversed: isReversed
      };
    });
  }

  // Legacy helper if single card draw is needed internally
  private drawCard(seed: string): TarotCard & { reversed: boolean } {
    return this.drawCards(1, seed)[0];
  }

  private cardToVector(card: TarotCard & { reversed: boolean }, isChallenge: boolean): FactorVector {
    const base = card.reversed ? card.reversedVector : card.uprightVector;
    const multiplier = isChallenge ? 0.7 : 1.0;

    return {
      stability: base.stability * multiplier,
      change: base.change * multiplier,
      risk: base.risk * multiplier,
      safety: base.safety * multiplier,
      innerGrowth: base.innerGrowth * multiplier,
      externalReward: base.externalReward * multiplier,
      emotionalIntensity: base.emotionalIntensity * multiplier,
      socialConnection: base.socialConnection * multiplier,
    };
  }

  private combineVectors(vectors: FactorVector[]): FactorVector {
    const result: FactorVector = {
      stability: 0, change: 0, risk: 0, safety: 0, 
      innerGrowth: 0, externalReward: 0, emotionalIntensity: 0, socialConnection: 0,
    };

    vectors.forEach(v => {
      Object.keys(result).forEach(key => {
        result[key] += v[key];
      });
    });

    Object.keys(result).forEach(key => {
      result[key] /= vectors.length;
    });

    return result;
  }

  private compareOptions(cardsA: TarotCard[], cardsB: TarotCard[]): string {
    const majorA = cardsA.filter(c => c.arcana === 'major').length;
    const majorB = cardsB.filter(c => c.arcana === 'major').length;

    if (majorA > majorB) {
      return 'Option A shows stronger cosmic significance (more Major Arcana cards).';
    } else if (majorB > majorA) {
      return 'Option B shows stronger cosmic significance (more Major Arcana cards).';
    }
    return 'Both options carry similar weight in the cosmic balance.';
  }

  // Improved PRNG (Linear Congruential Generator)
  private seededRandom(seed: string): () => number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }

    return () => {
      // Standard LCG constants (m = 2^31 - 1)
      hash = (hash * 1664525 + 1013904223) | 0;
      return Math.abs(hash) / 2147483647; // Normalize to 0-1
    };
  }
}
