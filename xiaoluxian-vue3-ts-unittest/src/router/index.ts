// src\router\index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import News from "../components/News.vue";


const routes:Array<RouteRecordRaw> = [
  { path: "/", redirect: "/Home" },
  // {
  //   path: "/index",
  //   name: "Index",
  //   redirect: "/index/index01",
  //   component: Index,
  //   children: [
  //     // 嵌套路由，可以避免多次重复导入公共组件
  //     {
  //       path: "index01",
  //       name: "Index01",
  //       component: () => import("../views/Home.vue"),
  //       meta: {
  //         title: "index01",
  //         icon: "dashboard",
  //       },
  //     },
  //     {
  //       path: "index02",
  //       name: "Index02",
  //       component: () => import("../views/Course.vue"),
  //       meta: {
  //         title: "index02",
  //         icon: "table",
  //       },
  //     },
  //     {
  //       path: "course-play/:courseId/:chapterId", // 可以 params query传参 和 props解耦
  //       name: "CoursePlay",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "CoursePlay" */ "../views/CoursePlay.vue"
  //         ),
  //       props: (route: { params: { courseId: any; chapterId: any; }; }) => ({
  //         courseId: route.params.courseId,
  //         chapterId: route.params.chapterId,
  //         // id: route.query.id,
  //       }),
  //     },
  //   ],
  // },
  { path: "/news", name: "News", component: News },

  {
    path: "/home",
    name: "Home",
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../components/Profile.vue"),
    props:(route: { params: { id: number; name: string; }; }) => ({
          id: Number(route.params.id),
          name: route.params.name,

        })
    // props:(route: { query: { id: any; name: any; }; }) => ({
    //       id: route.query.id,
    //       name: route.query.name,

    //     })
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
