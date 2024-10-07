import axios from 'axios';

export default {
  install(app) {
    const app_id = '661683';
    const accessKey = process.env.VUE_APP_UNSPLASH_ACCESS_KEY;
  

    axios.defaults.headers.common['Client-ID'] = app_id;
    axios.defaults.headers.common['Authorization'] = `Client-ID ${accessKey}`;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    app.config.globalProperties.$axios = axios;
  }
};
