import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class FeedbackDto {
  @IsString()
  choice: string; // 'A', 'B', 'neither', 'waiting'

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  feedback?: string;
}
