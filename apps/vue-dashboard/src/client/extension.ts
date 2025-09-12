import './../assets/main.css'
import {createApp} from "vue";
import { createPinia } from 'pinia'

import ExtensionContext from "./../entrypoint/extension-context.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

const app = createApp(ExtensionContext, {
  delimiters: ['${', '}'], // Avoid conflict with Liquid
});

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#extension-section')