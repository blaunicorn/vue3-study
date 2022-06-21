import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
app.use(router);

// import { createPinia } from "pinia";

// app.use(createPinia());

import store from "./store";
app.use(store);
app.mount("#app");
// createApp(App).use(router).mount("#app");
