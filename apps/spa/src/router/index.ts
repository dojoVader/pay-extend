import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard/hr"
    },
    {
      path: "/dashboard/hr",
      name: "Dashboard Hr",
      meta: {
        title: "Dashboard Hr"
      },
      component: () => import("@/views/dashboard/hr/index.vue")
    },
    {
      path: "/extension/index",
      name: "Extension Management",
      meta: {
        title: "Extension Management"
      },
      component: () => import("@/views/extension-management/list/index.vue")
    }, {
      path: "/extension/dom-selector",
      name: "DOM Selectors",
      meta: {
        title: "DOM Selectors"
      },
      component: () => import("@/views/dom-selectors/list/index.vue")
    },
    {
      path: "/extension/logs",
      name: "Logs",
      meta: {
        title: "Logs"
      },
      component: () => import("@/views/extension-logs/list/index.vue")
    },
    {
      path: "/integrations/payment",
      name: "Payment Integrations",
      meta: {
        title: "Payment Integrations"
      },
      component: () => import("@/views/integrations/payment/index.vue")
    }, {
      path: "/integrations/payment/stripe",
      name: "Stripe",
      meta: {
        title: "Stripe Settings"
      },
      component: () => import("@/views/integrations/payment/stripe/index.vue")
    }
  ]
});

export default router;
