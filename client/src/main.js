import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import store from './stores'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'       //theme

import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(store);
app.use(PrimeVue);
app.mount('#app');


