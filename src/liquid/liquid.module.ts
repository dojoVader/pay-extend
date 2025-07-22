import { DynamicModule, Module } from '@nestjs/common';
import { LiquidOptions } from 'liquidjs';
import { LiquidService } from './service/liquid.service';
import { LIQUID_ENGINE_TOKEN } from './constants';
import { getLiquidInstance } from './utils/liquid-instance';

@Module({})
export class LiquidModule {
  static forRoot(options: LiquidOptions): DynamicModule {
    const liquidEngine = getLiquidInstance(options);
    return {
      module: LiquidModule,
      providers: [
        {
          provide: LIQUID_ENGINE_TOKEN,
          useValue: liquidEngine,
        },
        LiquidService,
      ],
      exports: [LiquidService],
    };
  }
}
