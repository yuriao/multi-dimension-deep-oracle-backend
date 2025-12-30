import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsObject,
  IsArray,
  IsNumber,
} from 'class-validator';
import { PrimaryTradition } from '../entities/user-profile.entity';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  display_name?: string;

  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @IsString()
  @IsOptional()
  birth_time?: string;

  @IsString()
  @IsOptional()
  birth_place?: string;

  @IsNumber()
  @IsOptional()
  birth_latitude?: number;

  @IsNumber()
  @IsOptional()
  birth_longitude?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsEnum(PrimaryTradition)
  @IsOptional()
  primary_tradition?: PrimaryTradition;

  @IsObject()
  @IsOptional()
  preference_weights?: Record<string, number>;

  @IsArray()
  @IsOptional()
  enabled_techniques?: string[];

  @IsString()
  @IsOptional()
  locale?: string;

  @IsString()
  @IsOptional()
  timezone?: string;
}
