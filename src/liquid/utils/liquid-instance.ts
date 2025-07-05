import { Liquid, LiquidOptions } from 'liquidjs';

/**
 * Creates a new instance of Liquid with the provided options.
 * @param options LiquidOptions - The options to configure the Liquid instance.
 */
export function getLiquidInstance(options: LiquidOptions) {
  return new Liquid(options);
}
