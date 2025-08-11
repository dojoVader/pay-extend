import './../assets/main.css'
import {createApp} from "vue";
import { createPinia } from 'pinia'

import Login from "./../entrypoint/login.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

const app = createApp(Login, {
  delimiters: ['${', '}'], // Avoid conflict with Liquid
});

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#login-section')