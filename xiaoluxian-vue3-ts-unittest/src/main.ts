import { createApp } from 'vue'
import App from './App.vue'
import initVantUI from './plugins/vant';

import router from "./router";

import './assets/css/reset.css'
import './assets/css/common.css'


const app = createApp(App)
// createApp(App).mount('#app')

app.use(router);
initVantUI(app)
app.mount('#app')
