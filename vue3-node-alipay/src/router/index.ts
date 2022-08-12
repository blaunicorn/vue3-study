// src\router\index.ts
console.log('11')
import { createRouter, createWebHistory } from "vue-router";
import PaySuccess from "../views/PaySuccess.vue";
import Home from "../views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pay-success",
    name: "PaySuccess",
    component: PaySuccess,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
