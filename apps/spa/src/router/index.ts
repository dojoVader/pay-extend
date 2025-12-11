import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard/hr'
    },
    {
      path: '/dashboard/hr',
      name: 'Dashboard Hr',
      meta: {
        title: 'Dashboard Hr'
      },
      component: () => import('@/views/dashboard/hr/index.vue')
    },
    {
      path: '/extension/index',
      name: 'Extension Management',
      meta: {
        title: 'Extension Management'
      },
      component: () => import('@/views/extension-management/list/index.vue')
    },
    {
      path: '/extension/dom-selector',
      name: 'DOM Selectors',
      meta: {
        title: 'DOM Selectors'
      },
      component: () => import('@/views/dom-selectors/list/index.vue')
    },
    {
      path: '/extension/logs',
      name: 'Logs',
      meta: {
        title: 'Logs'
      },
      component: () => import('@/views/extension-logs/list/index.vue')
    },
    {
      path: '/integrations/payment',
      name: 'Payment Integrations',
      meta: {
        title: 'Payment Integrations'
      },
      component: () => import('@/views/integrations/payment/index.vue')
    },
    {
      path: '/integrations/payment/stripe',
      name: 'Stripe',
      meta: {
        title: 'Stripe Settings'
      },
      component: () => import('@/views/integrations/payment/stripe/index.vue')
    },


    // auth routes
    {
      path: '/auth/login',
      name: 'Login',
      meta: {
        title: 'Login'
      },
      component: () => import('@/views/auth/login/index.vue')
    },
    {
      path: '/auth/register',
      name: 'Register',
      meta: {
        title: 'Register'
      },
      component: () => import('@/views/auth/register/index.vue')
    },
    {
      path: '/auth/logout',
      name: 'Logout',
      meta: {
        title: 'Logout'
      },
      component: () => import('@/views/auth/logout/index.vue')
    },
    {
      path: '/auth/reset-pass',
      name: 'Reset Password',
      meta: {
        title: 'Reset Password'
      },
      component: () => import('@/views/auth/reset-pass/index.vue')
    },
    {
      path: '/auth/create-pass',
      name: 'Create Password',
      meta: {
        title: 'Create Password'
      },
      component: () => import('@/views/auth/create-pass/index.vue')
    },
    {
      path: '/auth/verify-email',
      name: 'Verify Email',
      meta: {
        title: 'Verify Email'
      },
      component: () => import('@/views/auth/verify-email/index.vue')
    },
    {
      path: '/auth/two-steps',
      name: 'Two Step Verification',
      meta: {
        title: 'Two Step Verification'
      },
      component: () => import('@/views/auth/two-steps/index.vue')
    }
  ]
})

export default router
