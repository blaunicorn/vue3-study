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
      // 嵌套路由，可以避免多次重复导入公共组件
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
      {
        path: "course-play/:courseId/:chapterId", // 可以 params query传参 和 props解耦
        name: "CoursePlay",
        component: () =>
          import(
            /* webpackChunkName: "CoursePlay" */ "../views/CoursePlay.vue"
          ),
        props: (route) => ({
          courseId: route.params.courseId,
          chapterId: route.params.chapterId,
          // id: route.query.id,
        }),
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
    path: "/course-info/:id", // 可以 params query传参 和 props解耦
    name: "CourseInfo",
    component: () =>
      import(/* webpackChunkName: "CourseInfo" */ "../views/CourseInfo.vue"),
    // 通过 props 解耦,方式一
    // props: true,
    // 方式二、函数模式来返回 props
    props: (route) => ({
      id: route.params.id,
      // id: route.query.id,
    }),
  },

  {
    path: "/member",
    name: "Member",
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/Course.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
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
