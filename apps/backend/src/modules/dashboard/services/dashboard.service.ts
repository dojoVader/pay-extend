import { Inject, Injectable } from '@nestjs/common';
import { DASHBOARD_MENU_ITEMS } from '../constants';
import { IDashboardMenuItem } from '../../../interfaces/interfaces';

@Injectable()
export class DashboardService {
  public constructor(
    @Inject(DASHBOARD_MENU_ITEMS)
    private readonly menuItems: IDashboardMenuItem[],
  ) {}

  public getMenuItems(): IDashboardMenuItem[] {
    return this.menuItems;
  }
}
