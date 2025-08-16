export class Config {
  static readonly API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
  static readonly AUTH_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:3000/auth';
  static readonly DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:8080';
  static readonly APP_NAME = import.meta.env.VITE_APP_NAME || 'Vue Dashboard';
  static readonly APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
  static api = (endpoint: string): string => {
    return `${Config.API_URL}${endpoint}`;
  };
}

