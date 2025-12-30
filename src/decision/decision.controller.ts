import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DecisionService } from './decision.service';
import { CreateDecisionDto } from './dto/create-decision.dto';
import { FeedbackDto } from './dto/feedback.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('decisions')
@UseGuards(JwtAuthGuard)
export class DecisionController {
  constructor(private decisionService: DecisionService) {}

  @Post()
  async create(@Request() req, @Body() createDecisionDto: CreateDecisionDto) {
    return this.decisionService.createDecision(req.user.id, createDecisionDto);
  }

  @Get(':id')
  async getOne(@Request() req, @Param('id') id: string) {
    return this.decisionService.getDecision(req.user.id, id);
  }

  @Get()
  async getHistory(
    @Request() req,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    return this.decisionService.getUserDecisions(req.user.id, limit, offset);
  }

  @Post(':id/feedback')
  @HttpCode(HttpStatus.OK)
  async submitFeedback(
    @Request() req,
    @Param('id') id: string,
    @Body() feedbackDto: FeedbackDto,
  ) {
    return this.decisionService.submitFeedback(req.user.id, id, feedbackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Request() req, @Param('id') id: string) {
    await this.decisionService.deleteDecision(req.user.id, id);
  }
}
