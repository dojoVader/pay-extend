import { access, constants } from 'node:fs';
import { cwd } from 'node:process';
import { DynamicModule, Module } from '@nestjs/common';
import { LiquidOptions } from 'liquidjs';
import { LiquidService } from './service/liquid.service';
import { LIQUID_ENGINE_TOKEN } from './constants';
import { getLiquidInstance } from './utils/liquid-instance';

@Module({})
export class LiquidModule {
  static checkIfViewFolderExists(options: LiquidOptions): void {
    if (!options.root || options.root.length === 0) {
      throw new Error(
        'Liquid root directory must be specified in the options.',
      );
    }
    // Additional checks can be added here to ensure the folder exists
    access(options.root as string, constants.F_OK, (err) => {
      if (err) {
        throw new Error(
          `Liquid root directory does not exist: ${options.root} in current path [${cwd()}]`,
        );
      }
    });
  }
  static forRoot(options: LiquidOptions): DynamicModule {
    this.checkIfViewFolderExists(options);
    // Augment the root with the current working directory if not absolute
    if (options.root || options.layouts) {
      options.root = `${cwd()}/${options.root}`;
      options.layouts = `${cwd()}/${options.layouts}`;
    }
    console.log(options);
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
