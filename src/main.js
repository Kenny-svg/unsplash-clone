
import { createApp } from 'vue';
import App from './App.vue';
import axiosPlugin from './plugins/axios';
import '@/assets/styles/globals.scss'
const app = createApp(App);

app.use(axiosPlugin);

app.mount('#app');
