import type { MenuItemType } from '@/types/layout'

export const menuItems: MenuItemType[] = [
  {
    key: 'overview-title',
    label: 'Overview',
    isTitle: true
  },
  {
    key: 'dashboards',
    label: 'Info Center',
    icon: 'lucide:gauge',
    children: [{ key: 'hr', label: 'Home', url: '/dashboard/hr' }]
  },
  {
    key: 'apps-title',
    label: 'Apps',
    isTitle: true
  },
  {
    key: 'extension',
    label: 'Extension',
    icon: 'lucide:picture-in-picture-2',
    children: [
      {
        key: 'extension',
        label: 'Extensions',
        icon: 'lucide:blocks',
        url: '/extension/index'
      },
      { key: 'dom-selector', label: 'DOM Selector', icon: 'lucide:code', url: '/extension/dom-selector' },
      { key: 'extension-logs', label: 'Logs', icon: 'lucide:code', url: '/extension/logs' }
    ]
  },
  {
    key: 'apps-title',
    label: 'Account',
    isTitle: true
  },
  {
    key: 'integration',
    label: 'Integrations',
    icon: 'lucide:hand-coins',
    url: '/integrations/payment'
  },
  {
    key: 'digitalocean',
    label: 'Digital Ocean',
    icon: 'lucide:cloudy',
    url: '/apps/chat'
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'lucide:sliders-vertical',
    url: '/apps/chat'
  },
  {
    key: 'firebase-center',
    label: 'Firebase Center',
    isTitle: true
  },
  {
    key: 'firebase-database',
    label: 'Firestore',
    icon: 'lucide:badge-question-mark',
    url: '/apps/chat'
  },
  {
    key: 'firebase-authentication',
    label: 'Authentication',
    icon: 'lucide:badge-question-mark',
    url: '/apps/chat'
  }
]
