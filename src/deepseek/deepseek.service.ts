import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class DeepSeekService {
  private client: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('DEEPSEEK_API_KEY');

    if (!apiKey) {
      console.warn('DEEPSEEK_API_KEY not configured. DeepSeek readings will be disabled.');
      return;
    }

    this.client = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.deepseek.com',
    });
  }

  async generateEnhancedReading(
    technique_contributions: any,
    combined_vector: any,
    question?: string,
  ): Promise<string> {
    if (!this.client) {
      return 'DeepSeek integration not configured. Please add DEEPSEEK_API_KEY to your .env file.';
    }

    try {
      // Build a comprehensive prompt from all 6 oracle readings
      const prompt = this.buildPrompt(technique_contributions, combined_vector, question);

      const completion = await this.client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `
Your role is to provide deep, meaningful, and personalized guidance by combining:
- Tarot symbolism and archetypes
- Western astrology planetary influences
- Numerology vibrational patterns
- I Ching wisdom and hexagrams
- BaZi (Four Pillars) elemental balance
- Zi Wei Dou Shu star influences

Provide a cohesive, insightful poem that weaves these traditions together into actionable wisdom.
The poem should be including the results of all the techniques.
it should have 8 lines, following an AABBCCDD rhyme scheme.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 200,
      });

      return completion.choices[0]?.message?.content || 'Unable to generate reading.';
    } catch (error) {
      console.error('DeepSeek API error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });
      return 'An error occurred while consulting the enhanced oracle. The traditional readings remain available.';
    }
  }

  private buildPrompt(
    technique_contributions: any,
    combined_vector: any,
    question?: string,
  ): string {
    let prompt = '';

    if (question) {
      prompt += `The querent asks: "${question}"\n\n`;
    } else {
      prompt += `This is a daily reading for the querent.\n\n`;
    }

    prompt += `The six oracle traditions have spoken. Please synthesize their insights into a cohesive, meaningful reading:\n\n`;

    // Add each technique's contribution
    const techniques = ['tarot', 'astrology', 'numerology', 'iching', 'bazi', 'ziwei'];

    techniques.forEach(technique => {
      if (technique_contributions[technique]) {
        const contrib = technique_contributions[technique];
        prompt += `**${this.getTechniqueName(technique)}:**\n`;
        prompt += `${contrib.details}\n`;

        if (contrib.vector) {
          const topDimension = this.getTopDimension(contrib.vector);
          prompt += `(Primary influence: ${topDimension})\n`;
        }
        prompt += `\n`;
      }
    });

    // Add combined dimensional analysis
    if (combined_vector) {
      prompt += `**Overall Dimensional Analysis:**\n`;
      const dimensions = Object.entries(combined_vector)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 3);

      dimensions.forEach(([dim, value]: [string, any]) => {
        prompt += `- ${this.formatDimension(dim)}: ${Math.round(value * 100)}%\n`;
      });
    }

    prompt += `\nPlease provide a synthesized reading that honors all six traditions while offering clear, actionable wisdom.`;

    return prompt;
  }

  private getTechniqueName(technique: string): string {
    const names = {
      tarot: 'Tarot',
      astrology: 'Western Astrology',
      numerology: 'Numerology',
      iching: 'I Ching',
      bazi: 'BaZi (Four Pillars)',
      ziwei: 'Zi Wei Dou Shu',
    };
    return names[technique] || technique;
  }

  private getTopDimension(vector: any): string {
    const entries = Object.entries(vector);
    if (entries.length === 0) return 'Unknown';

    const [dimension] = entries.reduce((max: any, current: any) =>
      current[1] > max[1] ? current : max
    );

    return this.formatDimension(dimension as string);
  }

  private formatDimension(dimension: string): string {
    const names = {
      stability: 'Stability',
      change: 'Change',
      risk: 'Risk Taking',
      safety: 'Safety',
      innerGrowth: 'Inner Growth',
      externalReward: 'External Reward',
      emotionalIntensity: 'Emotional Intensity',
      socialConnection: 'Social Connection',
    };
    return names[dimension] || dimension;
  }

  async chatCompletion(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  ): Promise<string> {
    if (!this.client) {
      return 'DeepSeek integration not configured. Please add DEEPSEEK_API_KEY to your .env file.';
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      return completion.choices[0]?.message?.content || 'Unable to generate response.';
    } catch (error) {
      console.error('DeepSeek chat API error:', error);
      return 'An error occurred while consulting the oracle. Please try again.';
    }
  }
}
