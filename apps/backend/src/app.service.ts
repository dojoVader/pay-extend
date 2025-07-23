import { Injectable } from '@nestjs/common';
import { LiquidService } from './modules/liquid/service/liquid.service';
import { Liquid } from 'liquidjs';

@Injectable()
export class AppService {
  constructor(private liquidService: LiquidService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getLiquidEngine(): Liquid {
    return this.liquidService.getEngine();
  }

  getLiquidViewsPath(): string {
    const engine = this.getLiquidEngine();
    if (engine.options.root && Array.isArray(engine.options.root)) {
      return engine.options.root[0]; // Return the first root path
    } else if (typeof engine.options.root === 'string') {
      return engine.options.root; // Return the string root path
    }
    throw new Error(
      'Liquid engine does not have a valid root path configured.',
    );
  }
}
