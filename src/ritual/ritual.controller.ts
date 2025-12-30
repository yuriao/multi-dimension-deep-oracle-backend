import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RitualService } from './ritual.service';
import { InvokeRitualDto } from './dto/invoke-ritual.dto';

@Controller('ritual')
@UseGuards(JwtAuthGuard)
export class RitualController {
  constructor(private ritualService: RitualService) {}

  @Post('invoke')
  async invoke(@Request() req, @Body() invokeDto: InvokeRitualDto) {
    return this.ritualService.invoke(req.user.userId, invokeDto);
  }
}
