import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

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
    {
      path: '/integrations/notification/smtp',
      name: 'SMTP Settings',
      meta: {
        title: 'SMTP Settings'
      },
      component: () => import('@/views/integrations/payment/smtp/smtp.vue')
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

// Global navigation guard: ensure routes (except /auth/*) have an active auth token.
router.beforeEach((to, from, next) => {
  try {
    const auth = useAuth()
    // primary check: localStorage token (explicit requirement), fallback to store
    const lsToken = localStorage.getItem('auth')
    const storeToken = auth?.user?.token
    const token = lsToken || storeToken

    // allow access to auth routes (login/register/etc.) and public root
    if (to.path.startsWith('/auth') || to.path === '/') {
      return next()
    }

    // If there's no token, redirect to login and preserve intended path
    if (!token) {
      return next({ path: '/auth/login', query: { redirect: to.fullPath } })
    }

    // token exists — proceed
    return next()
  } catch {
    // In case Pinia isn't ready or something fails, allow navigation to login
    return next({ path: '/auth/login', query: { redirect: to.fullPath } })
  }
})

export default router
