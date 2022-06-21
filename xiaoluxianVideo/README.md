# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 创建并启动项目
### 创建项目
```
npm init @vitejs/app xiaoluxianVideo
cd xiaoluxianVideo
npm install
npm run dev
```
### 安装router插件
```
npm install vue-router@4 -S
```
### 配置 src/router/index.js
```js
import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: Home },
  {
    path: "abuout",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

```
App.vue中增加路由管理组件
```js 
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-link to='/'> page1</router-link>
  <router-link to='/about'>page2 </router-link>
  <router-view></router-view>
</template>

```
挂在到main.js中
```js
import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

const app = createApp(App);

app.use(router);
app.mount("#app");

// createApp(App).mount("#app");
```

初始化样式
方式一：引入 reset.css

```css 
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
   reset.css
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```
在App.vue中设置样式
```
<style>
@import './assets/css/reset.css'
</style>
```
方式二：使用CSS工具——normalize.css
安装
```
npm install --save normalize.css
```
引入
```
import 'normalize.css/normalize.css'
```

### 创建头部组件
```js 
// components/common/Header.vue
<template>
头部
</template>
```
Home.vue中引入
```js
// views/Home.vue
<template>
Home
<Header></Header>
</template>
<script setup>
import Header from "../components/common/Header.vue"
</script>
```
引入element-ui 
下载
```
npm installelement-plus --save
```
main.js中引入
```js
// main.js 
import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

// 初始化样式
import "normalize.css/normalize.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.mount("#app");
```
