import { IsString, IsUUID, IsEnum, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsUUID()
  @IsNotEmpty()
  reading_id: string;

  @IsEnum(['DAILY', 'DECISION'])
  @IsNotEmpty()
  reading_type: 'DAILY' | 'DECISION';

  @IsString()
  @IsNotEmpty()
  message: string;
}
