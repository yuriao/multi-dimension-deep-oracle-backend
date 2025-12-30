import { IsString, IsArray, IsOptional, IsIn } from 'class-validator';

export class InvokeRitualDto {
  @IsString()
  @IsIn(['DAILY', 'QUESTION'])
  type: 'DAILY' | 'QUESTION';

  @IsString()
  @IsOptional()
  text?: string;

  @IsArray()
  @IsOptional()
  selected_modules?: string[];
}
