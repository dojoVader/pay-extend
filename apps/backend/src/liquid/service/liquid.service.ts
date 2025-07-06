import { Inject, Injectable } from '@nestjs/common';
import { Liquid } from 'liquidjs';
import { InjectLiquid } from "../decorators";

@Injectable()
export class LiquidService {
  // This service can be used to manage Liquid templates and rendering logic
  // You can inject the Liquid Engine instance here if needed

  constructor(@InjectLiquid() private liquidEngine: Liquid) {}

  getEngine(): Liquid {
    return this.liquidEngine;
  }
}
