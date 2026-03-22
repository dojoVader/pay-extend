type CurrencyType = '₹' | '$' | '€'

export const currency: CurrencyType = '$'

export const currentYear = new Date().getFullYear()

export const appFavicon = '/favicon.ico'
export const appName = 'Payextend'
export const appTitle = 'Payextend - The Premium dashboard for Chrome extension integration'
export const appDescription: string = 'A fully featured admin theme that handles Chrome extension integration.'

export const author: string = 'Retani Consults'
export const authorWebsite: string = 'https://retaniconsults.com/'
export const authorContact: string = ''

export const basePath: string = ''
export const API_BASE_URL = 'http://localhost:3000/api/v1'

export const PAYEXTEND_ENDPOINTS = {
  HOST: '127.0.0.1:9000',
  BACKEND: '',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  USER_PROFILE: '/auth/user-profile',
}

export const PayextendPath = () => `http://${PAYEXTEND_ENDPOINTS.HOST}${PAYEXTEND_ENDPOINTS.BACKEND}`;
