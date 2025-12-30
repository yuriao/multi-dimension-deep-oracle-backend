import { Module } from '@nestjs/common';
import { DivinationService } from './divination.service';
import { TarotModule as TarotModuleImpl } from './modules/tarot/tarot.module-impl';
import { AstrologyModule } from './modules/astrology/astrology.module-impl';
import { NumerologyModule } from './modules/numerology/numerology.module-impl';
import { IChingModule } from './modules/iching/iching.module-impl';
import { BaZiModule } from './modules/bazi/bazi.module-impl';
import { ZiWeiModule } from './modules/ziwei/ziwei.module-impl';

@Module({
  providers: [
    DivinationService,
    TarotModuleImpl,
    AstrologyModule,
    NumerologyModule,
    IChingModule,
    BaZiModule,
    ZiWeiModule,
  ],
  exports: [DivinationService],
})
export class DivinationModule {}
