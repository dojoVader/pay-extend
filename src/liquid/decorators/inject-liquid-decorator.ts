import { LIQUID_ENGINE_TOKEN } from '../constants';
import { Inject } from '@nestjs/common';

/**
 * InjectLiquid is a custom decorator that injects the Liquid Engine instance
 * @constructor
 */
export function InjectLiquid() {
  return Inject(LIQUID_ENGINE_TOKEN);
}
