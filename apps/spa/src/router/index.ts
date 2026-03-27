import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
    },
    {
      path: '/extension/index',
      name: 'Extension Management',
      component: () => import('@/views/extension-management/index.vue'),
    },
    {
      path: '/extension/item/:id',
      name: 'Extension Item',
      component: () => import('@/views/extension-item/index.vue'),
    },
    {
      path: '/extension/dom-selector',
      name: 'DOM Selectors',
      component: () => import('@/views/dom-selectors/index.vue'),
    },
    {
      path: '/extension/logs',
      name: 'Logs',
      component: () => import('@/views/extension-logs/index.vue'),
    },
    {
      path: '/integrations/payment',
      name: 'Payment Integrations',
      component: () => import('@/views/integrations/index.vue'),
    },
    {
      path: '/integrations/payment/stripe',
      name: 'Stripe',
      component: () => import('@/views/integrations/polar/index.vue'),
    },
    {
      path: '/integrations/notification/smtp',
      name: 'SMTP Settings',
      component: () => import('@/views/integrations/smtp/index.vue'),
    },
    {
      path: '/integrations/extension/chrome-webstore',
      name: 'Chrome Webstore Settings',
      component: () => import('@/views/integrations/chrome-webstore/index.vue'),
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('@/views/auth/login/index.vue'),
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: () => import('@/views/auth/register/index.vue'),
    },
    {
      path: '/auth/logout',
      name: 'Logout',
      component: () => import('@/views/auth/logout/index.vue'),
    },
  ],
});

export default router;
