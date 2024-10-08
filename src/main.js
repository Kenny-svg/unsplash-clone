
import { createApp } from 'vue';
import App from './App.vue';
import axiosPlugin from './plugins/axios';
import '@/assets/styles/globals.scss'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);
library.add(faClose)
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(axiosPlugin);

app.mount('#app');
