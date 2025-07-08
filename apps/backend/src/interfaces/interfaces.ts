/**
 * Represents a dashboard menu item with properties for defining its name, navigation path,
 * optional icon, and roles for access control.
 */
export interface IDashboardMenuItem {
  name: string;
  path: string;
  icon?: string;
  roles?: string[];
}


export interface IDashboardModuleConfiguration {
  menuItems: IDashboardMenuItem[];
  appName: string;
  version: string;
  logoUrl: string;
}