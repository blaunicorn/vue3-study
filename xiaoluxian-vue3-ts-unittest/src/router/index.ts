// src\router\index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../assets/css/default.css";

import News from "../components/News.vue";
const routes: Array<RouteRecordRaw> = [
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

  {
    path: "/home",
    name: "Home",
    component: () => import("../components/Home.vue"),
    redirect: "/home/news",
    children: [
      // 资讯页面
      {
        path: "news",
        name: "News",
        component: News,
        meta: { title: "资讯", needAuth: false },
      },
      {
        path: "knowledge",
        name: "Knowledge",
        component: () => import("../views/Knowledge.vue"),
      },
      {
        path: "detail",
        name: "Detail",
        component: () => import("../views/Detail.vue"),
        props: (route: { query: { id: string } }) => ({
          id: route.query.id,
        }),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../components/Profile.vue"),
        props: (route: { params: { id: number; name: string } }) => ({
          id: Number(route.params.id),
          name: route.params.name,
        }),
        // props:(route: { query: { id: any; name: any; }; }) => ({
        //       id: route.query.id,
        //       name: route.query.name,

        //     })
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    redirect: "/dashboard/admin/list",
    children: [
      {
        path: "admin/list",
        name: "AdminList",
        component: () => import("../views/AdminList.vue"),
      },
      {
        path: "role/list",
        name: "RoleList",
        component: () => import("../views/RoleList.vue"),
      },
      {
        path: "cate/list",
        name: "CateList",
        component: () => import("../views/CateList.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  let title = document.title as unknown;
  title = to.meta.title;
  //  localStorage.setItem('testToken',"test")
  const whiteList = [
    "/home",
    "/login",
    "/home/news",
    "/home/knowledge",
    "/home/detail",
    "/home/profile",
  ]; // 白名单
  const getToken = () => {
    let value: string | null = localStorage.getItem("testToken");
    return value;
  };
  let hasToken = getToken();
  console.log("to:", to, "from:", from, hasToken);
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/dashboard" });
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(to.path);
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
    }
  }

  // 另一种方式
  // let needAuth = to.meta.needAuth;
  // //  需要授权登录后才能访问，检测登录的标识token是否存在

  // if (hasToken) {
  //   // 代表用户已经登录了
  //     next()    
  // } else  {
  //   // 代表用户没有登录，重定向到login页面
  //   next('/login')
  // }
});

router.afterEach((to, from, next) => {
  NProgress.done();
});

export default router;
