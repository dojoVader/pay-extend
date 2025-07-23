import { Injectable } from '@nestjs/common';
import { LiquidService } from './liquid/service/liquid.service';
import { Liquid } from 'liquidjs';

@Injectable()
export class AppService {
  constructor(private liquidService: LiquidService) {

  }
  getHello(): string {
    return 'Hello World!';
  }

  getLiquidEngine(): Liquid {
    return this.liquidService.getEngine();
  }
}
