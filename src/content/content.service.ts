import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentService {
  async generateDailyNarrative(
    dominantDimension: string,
    vector: any,
    techniqueContributions: any,
  ): Promise<string> {
    // Simplified template-based generation
    // In production, this would use LLM or sophisticated templates

    const templates: Record<string, string> = {
      stability:
        'Today is a day for maintaining balance and security. The energies suggest consolidating your resources and appreciating what you have built.',
      change:
        'Transformation is in the air today. Be open to new possibilities and trust that change will lead you to growth.',
      risk: 'Exercise caution today, but do not let fear paralyze you. Calculated risks may lead to rewards.',
      safety:
        'Protection and security are emphasized today. Take time to ensure your foundations are solid.',
      innerGrowth:
        'This is an excellent day for introspection and personal development. What you learn about yourself today will serve you well.',
      externalReward:
        'Your efforts are likely to be recognized today. Material success and acknowledgment are within reach.',
      emotionalIntensity:
        'Emotions run deep today. Allow yourself to feel fully, but maintain your center.',
      socialConnection:
        'Relationships and community are highlighted. Reach out, collaborate, and strengthen your bonds.',
    };

    let narrative = templates[dominantDimension] || 'Today brings balanced energies across all dimensions.';

    // Add technique insights
    narrative += '\n\nThe oracles speak: ';
    const techniques = Object.keys(techniqueContributions).slice(0, 3);
    narrative += techniques.map((t) => techniqueContributions[t].explanation).join(' ');

    return narrative;
  }

  async generateDecisionNarrative(
    question: string,
    optionA: string,
    optionB: string,
    recommendation: string,
    confidence: number,
    techniqueReadings: any,
  ): Promise<string> {
    let narrative = `Regarding your question: "${question}"\n\n`;

    if (recommendation === 'A') {
      narrative += `The oracles lean towards ${optionA} with ${confidence.toFixed(0)}% confidence. `;
    } else if (recommendation === 'B') {
      narrative += `The oracles favor ${optionB} with ${confidence.toFixed(0)}% confidence. `;
    } else if (recommendation === 'neutral') {
      narrative += 'The energies between both options are balanced. ';
    } else {
      narrative += 'The oracles suggest waiting for a clearer moment. ';
    }

    narrative += '\n\nMultiple divination systems have been consulted:\n';

    Object.entries(techniqueReadings).forEach(([technique, reading]: [string, any]) => {
      narrative += `\n• ${technique.charAt(0).toUpperCase() + technique.slice(1)}: ${reading.comparison}`;
    });

    narrative +=
      '\n\nRemember that these readings are guidance, not commands. Your free will and wisdom are the ultimate authorities in your life.';

    return narrative;
  }
}
