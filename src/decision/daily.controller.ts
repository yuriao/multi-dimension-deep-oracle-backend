import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DecisionService } from './decision.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('daily')
@UseGuards(JwtAuthGuard)
export class DailyController {
  constructor(private decisionService: DecisionService) {}

  @Get('today')
  async getToday(@Request() req) {
    return this.decisionService.getTodayReading(req.user.id);
  }

  @Get()
  async getByDate(@Request() req, @Query('date') dateString: string) {
    const date = dateString ? new Date(dateString) : new Date();
    return this.decisionService.getTodayReading(req.user.id, date);
  }
}
