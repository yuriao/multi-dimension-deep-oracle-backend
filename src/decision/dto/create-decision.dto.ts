import { IsString, IsEnum, IsArray, IsOptional } from 'class-validator';
import { DecisionCategory } from '../entities/decision.entity';

export class CreateDecisionDto {
  @IsEnum(DecisionCategory)
  category: DecisionCategory;

  @IsString()
  question: string;

  @IsString()
  option_a: string;

  @IsString()
  option_b: string;

  @IsArray()
  @IsOptional()
  enabled_techniques?: string[];
}
