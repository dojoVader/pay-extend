import './assets/main.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import { routes } from "@/routes/routes.ts";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App)

app.use(router);
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#app')
