// src\router\index.js
import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Index from "../views/index.vue";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/index",
    name: "Index",
    redirect: "/index/index01",
    component: Index,
    children: [
      {
        path: "index01",
        name: "Index01",
        component: () => import("../views/Home.vue"),
        meta: {
          title: "index01",
          icon: "dashboard",
        },
      },
      {
        path: "index02",
        name: "Index02",
        component: () => import("../views/Course.vue"),
        meta: {
          title: "index02",
          icon: "table",
        },
      },
    ],
  },
  { path: "/home", name: "Home", component: Home },
  {
    path: "/course",
    name: "Course",
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/Course.vue"),
  },
  {
    path: "/member",
    name: "Member",
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/Course.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
