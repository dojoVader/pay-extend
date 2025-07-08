import { Module, DynamicModule } from '@nestjs/common';
import { IDashboardModuleConfiguration } from '../../interfaces/interfaces';
import { DASHBOARD_MENU_ITEMS } from './constants';
import { DashboardService } from './services/DashboardService';

@Module({
  providers: [DashboardService],
})
export class DashboardModule {
  static forRoot(config: IDashboardModuleConfiguration): DynamicModule {
    const menuItems = config.menuItems;

    // Configure the provider

    return {
      module: DashboardModule,
      providers: [
        {
          provide: DASHBOARD_MENU_ITEMS,
          useValue: menuItems,
        },
        DashboardService,
      ],
    };
  }
}
