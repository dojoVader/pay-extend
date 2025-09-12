import './../assets/main.css'
import {createApp} from "vue";
import { createPinia } from 'pinia'

import Portal from '@/entrypoint/main.vue';
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "@/routes/routes.ts";

const app = createApp(Portal, {
  delimiters: ['${', '}'], // Avoid conflict with Liquid
});

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes
})

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#app')