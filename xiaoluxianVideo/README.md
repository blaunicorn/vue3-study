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
npm i unplugin-auto-import -D
npm install axios -S
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
### 头部
注意el图标的引入方式
```js
<template>
  <header>
    <div class="header-content">
      <h1 class="content-logo">
        <img src="../../assets/logo.png" alt="" srcset="">
      </h1>
      <div class="content-nav">
        <ul>
          <li>首 页</li>
          <li>课程</li>
          <li>会员</li>
        </ul>
      </div>
      <div class="search-buy-login">
        <div class="content-search"><input type="text" placeholder="请输入搜索的课程"><el-icon :size="22"  color="#808080"><search /></el-icon></div>
        <div class="content-shopping">
          <el-icon  :size="24" color="#808080"><ShoppingCart/></el-icon>
        </div>
        <div class="content-login">登录/注册</div>
      </div>
    </div>
  </header>
</template>
<script setup>
import {Search, ShoppingCart} from "@element-plus/icons-vue"
</script>
<style scoped>

header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
}
.header-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1200px;
  min-width: 800px;
}
.content-logo {
  width: 160px;
  height: 55px;
  margin: 10px 0;
  cursor: pointer;
}
.content-logo img {
  height: 100%;
  object-fit: cover;
}
.content-nav {
  width: 340px;
  height: 75px;
}
.content-nav ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 75px;
  margin:0 0;
  padding: 0 0;
  list-style: none;
}
.content-nav ul li {
  font-size: 18px;
  color: #808080;
  cursor: pointer;
}
.search-buy-login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
}
.search-buy-login svg {
  cursor: pointer;
}
.content-search {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  width: 350px;
  height: 35px;
  background:#f0f2f4;
  opacity: 1;
  border-radius: 8px;
}
.content-search input {
  padding: 0 10px;
  width: 430px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background-color: #f0f2f4;
  color: #808080;
  font-size: 16px;
  outline: none;
}
.content-login {
  font-size: 18px;
  color: #808080;
  text-align: center;
  cursor: pointer;
}
</style>
```

### 轮播图组件
```
<template>
  <div class="navSwiper">
    <div class="content">
      <div class="navigation">
        <ul>
          <li>
            <router-link to="/"
              >Node.js
              <el-icon color="#fff" :size="16">
                <arrow-right />
              </el-icon>
            </router-link>
            <div class="cateory-detail">
              <div class="detail-main">
                <div class="detail-desc">基础知识1</div>
                <div class="detail-list">
                  <div class="list-know">知识点1：</div>
                  <div class="list-ul">
                    <router-link to="/" class="list-item">1html</router-link>
                    <router-link to="/" class="list-item">1v8</router-link>
                  </div>
                </div>
                <div class="detail-class">
                  <div class="course-card">
                    <div class="course-image">
                      <img
                        src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/ed4eca4ebbeb4b489de722925a34d086.jpg"
                        alt=""
                      />
                    </div>
                    <div class="right">
                      <div class="course-name">课程标题</div>
                      <div class="course-degree">中级 · 55人购买</div>
                      <div class="buy">
                        <div class="buy-free">
                          <div class="course-price">
                            <div class="course-member">会员专享</div>
                            <div class="price">￥0.01</div>
                          </div>
                          <div class="cart">
                            <div class="cart-image">
                              <img
                                src="https://www.xuexiluxian.cn/resources/images/vipLogo.png"
                                alt=""
                              />
                            </div>
                            <span class="addcart">加入购物车</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <router-link to="/"
              >Node.js
              <el-icon color="#fff" :size="16">
                <arrow-right />
              </el-icon>
            </router-link>
            <div class="cateory-detail">
              <div class="detail-main">
                <div class="detail-desc">基础知识</div>
                <div class="detail-list">
                  <div class="list-know">知识点：</div>
                  <div class="list-ul">
                    <router-link to="/" class="list-item">html</router-link>
                    <router-link to="/" class="list-item">v8</router-link>
                  </div>
                </div>
                <div class="detail-class">
                  <div class="course-card">
                    <div class="course-image">
                      <img
                        src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/ed4eca4ebbeb4b489de722925a34d086.jpg"
                        alt=""
                      />
                    </div>
                    <div class="right">
                      <div class="course-name">课程标题</div>
                      <div class="course-degree">中级 · 55人购买</div>
                      <div class="buy">
                        <div class="buy-free">
                          <div class="course-price">
                            <div class="course-member">会员专享</div>
                            <div class="price">￥0.01</div>
                          </div>
                          <div class="cart">
                            <div class="cart-image">
                              <img
                                src="https://www.xuexiluxian.cn/resources/images/vipLogo.png"
                                alt=""
                              />
                            </div>
                            <span class="addcart">加入购物车</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 轮播图 -->
      <div class="sliders">
        <el-carousel
          :interval="5000"
          arrow="always"
          height="460px"
          v-if="slidersList.length > 0"
        >
          <el-carousel-item v-for="item in slidersList" :key="item">
            <!-- <h3 text="2xl" justify="center">{{ item.img }}</h3> -->
            <a :href="item.href"> <img :src="item.img" /></a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="course-type">
      <div
        class="course-type-item"
        v-for="(item, index) in courseType"
        :key="index"
      >
        <router-link to="/">
          <div class="course-type-item-icon">
            <img :src="item.img" alt="" />
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">{{ item.title }}</div>
            <div class="course-type-item-desc">{{ item.desc }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
let slidersList = ref([
  {
    img: "https://oss.xuexiluxian.cn/xiaoluxian-vcr/8c6ee4cf7fb54425987871b9a2f52f2e.png",
    href: "https://www.xuexiluxian.cn/course/detail/bc669b67e3594bf8a0003e8145de13ea",
  },
  {
    img: "https://oss.xuexiluxian.cn/xiaoluxian-vcr/1985d6893e044996bf54b0a2ee904981.jpg",
    href: "https://www.xuexiluxian.cn/course/detail/bc669b67e3594bf8a0003e8145de13ea",
  },
  {
    img: "https://oss.xuexiluxian.cn/xiaoluxian-vcr/84f13f71af004296b14d7561a67df282.jpg",
    href: "https://www.xuexiluxian.cn/course/detail/bc669b67e3594bf8a0003e8145de13ea",
  },
  {
    img: "https://oss.xuexiluxian.cn/xiaoluxian-vcr/84f13f71af004296b14d7561a67df282.jpg",
    href: "https://www.xuexiluxian.cn/course/detail/bc669b67e3594bf8a0003e8145de13ea",
  },
]);

let courseType = ref([
  {
    img: "https://www.xuexiluxian.cn/resources/images/index/chuji.png",
    title: "初级课程",
    desc: "入门快、岗位多",
  },
  {
    img: "https://www.xuexiluxian.cn/resources/images/index/zhongji.png",
    title: "中级课程",
    desc: "进阶与实战",
  },
  {
    img: "https://www.xuexiluxian.cn/resources/images/index/gaoji.png",
    title: "高级课程",
    desc: "松掌握核心技能",
  },
  {
    img: "https://www.xuexiluxian.cn/resources/images/index/xiangmu.png",
    title: "项目实战",
    desc: "手把手实践",
  },
  {
    img: "https://www.xuexiluxian.cn/resources/images/index/suanfa.png",
    title: "前端算法",
    desc: "笑傲前端技能",
  },
]);
</script>
<style scoped>
.navSwiper ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.navSwiper {
  padding-top: 1px;
  width: 100%;
  height: 640px;
  background: url("https://oss.xuexiluxian.cn/xiaoluxian-vcr/1985d6893e044996bf54b0a2ee904981.jpg")
    center top repeat-x;
  /* opacity: 0.7;
  filter: blur(50px); */
  overflow: hidden;
}
.content {
  display: flex;
  width: 1200px;
  height: 460px;
  margin: 35px auto 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}
.navigation {
  width: 240px;
  height: 460px;
  background-color: #2b283d;
  position: relative;
}
.navigation ul {
  margin: 20px 0;
  width: 240px;
}
.navigation ul li {
  height: 40px;
  list-style: none;
  margin-bottom: 5px;
}
.navigation ul li a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
}
.navigation ul li a:hover {
  background: linear-gradient(to right, #3fe5ff, transparent);
}
.cateory-detail {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 240px;
  background-color: rgba(255, 255, 255);
  z-index: 100;
  min-width: 800px;
  height: 460px;
  border-top-right-radius: 10px;
  box-sizing: border-box;
  display: none;
}
.navigation ul li:hover .cateory-detail {
  display: block;
  transition: all 2s ease-in;
}
.sliders {
  width: 1060px;
  height: 460px;
}
.sliders img {
  height: 100%;
  width: 100%;
}
.detail-main {
  cursor: pointer;
  height: 100%;
}
.detail-desc {
  padding-top: 20px;
  padding-left: 20px;
  height: 26px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  opacity: 1;
}
.detail-list {
  width: 100%;
  display: flex;
  margin-top: 10px;
  padding-left: 20px;
  color: #333333;
  font-weight: 400;
  font-size: 14px;
}
.list-know {
  width: 70px;
  height: 30-x;
  line-height: 30px;
}
.list-ul {
  width: calc(100% - 70px);
  display: flex;
  flex-wrap: wrap;
}
.list-ul .list-item {
  line-height: 30px;
  padding: 0 10px;
  color: #333333;
  font-size: 14px;
  font-weight: unset;
  height: auto;
}
.list-ul .list-item:hover {
  background: unset;
  color: #00ffff;
}

.detail-class {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 270px;
  padding: 20px 0px;
  background-color: #f3f5f6;
}
.course-card {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-around;
  width: 370px;
  height: 110px;
  box-sizing: border-box;
}
.course-image {
  width: 200px;
  height: 90px;

  cursor: pointer;
}
.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}
.right {
  display: flex;
  height: 90px;
  padding: 5px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
}
.course-name {
  width: 100%;
  height: 12px;
  line-height: 12px;
  font-weight: bold;
  font-size: 12px;
  color: #333333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.course-degree {
  font-size: 12px;
  color: #808080;
}
.course-price {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.course-price-zero {
  display: flex;
  justify-content: center;
  align-items: center;
}
.course-pri {
  font-size: 12px;
}
.price {
  margin-left: 5px;
  color: red;
}
.course-member {
  color: #ffffff;
  padding: 2px;
  box-sizing: border-box;
  background-color: red;
  border-radius: 6px;
}
.course-price-pri {
  font-size: 12px;
}
.buy {
  width: 200px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.buy-free {
  display: flex;
  align-items: center;
}
.buy-free .cart {
  display: flex;
}
.buy-free img {
  width: 12px;
  height: 12px;
  margin-left: 10px;
}
.buy .learn {
  color: #3586ff;
  font-size: 12px;
}
.buy .cart {
  display: flex;
  margin-right: 5px;
  font-size: 12px;
}
.buy .addcart {
  margin-left: 2px;
  color: #ff3d17;
  font-size: 12px;
  cursor: pointer;
}
.course-type {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 10px 25px 10px #d2d2d2;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.course-type-item {
  width: 260px;
  height: 260px;
  flex: 1;
}
.course-type-item a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
.course-type-item-icon {
  box-sizing: border-box;
  font-size: 35px;
  border-radius: 50%;
  margin: 25px 10px 25px 0;
  width: 50%;
  height: 50%;
  /* background-color: #55ee8b; */
  text-align: center;
  line-height: 50px;
  color: #ffffff;
}
.course-type-item-icon img {
  width: 100%;
  height: 100%;
}
.course-type-item-text {
  margin: 25px 0;
}
.course-type-item-title {
  font-size: 18px;
  line-height: 30px;
  font-weight: bold;
}
.course-type-item-desc {
  color: #808080;
  font-size: 14px;
}
</style>

```
### axios封装
```
//  src/utils/request.js
import axios from "axios";

//1. 创建axios对象
const service = axios.create();

//2. 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//3. 响应拦截器
service.interceptors.response.use(
  (response) => {
    //判断code码
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;

```
### 创建api目录和文件
```
 // src\api\index.js
 import request from "../utils/request";

// 获取一级分类
export function getFirstCategorys(params) {
  return request({
    url: "/api/course/category/getFirstCategorys",
    method: "get",
    params,
  });
}

// 获取二级分类,即课程标签
// {
//   pageNmu:1,   // int ,默认1
//   pageSize: 10,  // int  默认10
//   entity: {
//     firstCategory:'',  // string 一级分类ID
//     secondCategory:'',   // string 二级分类id
//   }
// }
export function getTagsList(data) {
  return request({
    url: "/api/course/tags/list",
    method: "post",
    data,
  });
}

// 查询课程
// {
//   pageNmu:1,   // int ,默认1
//   pageSize: 10,  // int  默认10
//   entity: {
//     firstCategory:'',  // string 一级分类ID
//     secondCategory:'',   // string 二级分类id
//     tags:'',   // string 知识点
//     isMember:'',   // string 会员课程 传1
//     isFree:'',   // string 免费课程 传1
//     courseLevel:'',   // string 课程等级 （1：初级；2：中级：3：高级）
//     sortBy:'',   // string 排序方式 （1：点击量倒叙：clicks-desc;2:点击量正序:clicks-)
//   }
// }
export function getSearchCourse(data) {
  return request({
    url: "/api/course/search",
    method: "post",
    data,
  });
}

// 图片轮播

export function getSliders(data) {
  return request({
    url: "/api/slider/getSliders",
    method: "get",
    data,
  });
}

export function mostNew(data) {
  return request({
    url: "/api/course/category/getFirstCategorys",
    method: "post",
    data,
  });
}

```
### 首页-新上好课组件
创建组件
```js
// src/components/home/NewGoodCourse.vue
<template>
  <div>new</div>
</template>
```
Home.vue引入NewGoodCourse.vue组件
```js
// src\views\Home.vue
<template>
	<Header></Header>
	<NavSwiper></NavSwiper>
	<NewGoodCourse></NewGoodCourse>
</template>

<script setup>
import Header from '../components/common/Header.vue'
import NavSwiper from '../components/home/NavSwiper.vue'
import NewGoodCourse from '../components/home/NewGoodCourse.vue'
</script>
```
编写NewGoodCourse.vue组件组件样式布局
```js
<template>
  <div class="new-course">
    <div class="content-title">
      <div class="content-title-left">
        <div class="hot">
          <div class="hot-l">HoT</div>
          <div class="hot-r"></div>
        </div>
        <div class="txt">
          <div class="txt-top">新上好课</div>
          <div class="txt-bottom"></div>
        </div>
      </div>
      <div class="more">更多</div>
    </div>
    <div class="new-course-content">
      <ul>
        <li class="course-item" v-for="item in 4" :key="item">
          <div class="course-info">
            <div class="course-bg">
              <img
                src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/d00f57f5da1b4313928f33558880cbfe.jpg"
                alt=""
                srcset=""
              />
            </div>
            <div class="course-name">js</div>
            <div class="course-degree">初级 · 386人报名</div>
            <div class="course-price-pri">￥24</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.new-course {
  width: 1200px;
  margin: 0 auto;
  margin-top: 15px;
}
.content-title {
  display: flex;
  justify-content: space-between;
}
.content-title-left {
  display: flex;
}
.hot {
  display: flex;
  height: 38px;
}
.hot-l {
  height: 38px;
  font-size: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 38px;
  color: #ffffff;
  border-radius: 8px 0 8px 8px;
  background: linear-gradient(90deg, #ff727f 0%, #fc685c 100%);
}
.hot-r {
  width: 0;
  height: 0;
  border: 6px solid #fc685c;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
.txt {
  height: 38px;
  margin-left: 10px;
}
.txt-top {
  font-size: 24px;
  padding: 0 5px;
  color: #222;
  line-height: 30px;
  z-index: 1;
}
.txt-top::after {
  content: "";
  display: block;
  margin-top: -10px;
  border-radius: 7px;
  border-bottom: 14px solid;
  /* border-bottom: 14px solid #01a1ff; */
  border-image: -webkit-linear-gradient(90deg, #fbf84f 0%, #fea935 100%) 1 30;
  clip-path: border-box(0 0 round 5px);
}
.more {
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: #808080;
}
.new-course-content {
  width: 1200px;
  margin: 15px auto 0px auto;
}
.new-course-content ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.course-item {
  box-sizing: border-box;
  width: 285px;
  height: 280px;
  margin: 0 20px 20px 0;
  transition: margin-top 0.2s;
}
.course-item:hover {
  margin-top: -10px;
  cursor: pointer;
}
.new-course-content .course-item:nth-child(4n + 0) {
  margin-right: 0;
}
.course-info {
  width: 100%;
  height: 270px;
  background-color: #ffffff;
  box-shadow: 1px 1px 10px rgba(27, 39, 94, 0.4);
  opacity: 1;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
  text-decoration: none;
}
.course-bg {
  width: 100%;
  height: 160px;
}
.course-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.course-name {
  margin: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  overflow: hidden;
}
.course-degree {
  margin-left: 10px;
  font-size: 12px;
  color: #808080;
}
.course-price-pri {
  width: 75px;
  font-size: 14px;
  margin-top: 18px;
  padding: 0 13px;
  color: rgba(255,114,127,1);
  font-weight: 700;
}
</style>

```
### 首页-底部组件
```js
// src/components/common/Foot.vue
<template>
  <footer>
    <div class="footer-main">
      <div class="footer-xlx">
        <img src="../../assets/img/logo.jpg" alt="" />
      </div>
      <div class="footer-factory">
        <img src="../../assets/logo.png" alt="" srcset="" />g
      </div>
      <div class="copyright">
        <ul class="copy-top">
          <li>关于我们</li>
          <li>|</li>
          <li>联系我们</li>
          <li>|</li>
          <li>意见反馈</li>
          <li>|</li>
          <li>版权声明</li>
        </ul>
        <div class="copy-bottom">
          <span>{{ copyright }}Copyright 2021 www.tisuba.com 黑备</span>
          <a
            data-v-d94f43e2=""
            href="https://beian.miit.gov.cn/"
            target="_blank"
            class="go"
            >黑备{{ icp }}</a
          >
          <p class="copy-user">
            <a href="">《用户服务协议》</a>
            <a href="">《隐私政策》</a>
          </p>
        </div>
      </div>
      <div class="wx">
        <div class="wx-bg">
          <img src="../../assets/img/logo.jpg" alt="" srcset="" />
        </div>
        <div class="wx-dsc">官方微信</div>
      </div>
      <div class="wx">
        <div class="wx-bg">
          <img src="../../assets/img/logo.jpg" />
        </div>
        <div class="wx-dsc">咨询老师微信</div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { getSetting } from "../../api/index";
let copyright = ref("");
let icp = ref("");
onBeforeMount(() => {
  getSetting().then((res) => {
    copyright.value = res.data.data.copyright;
    icp.value = res.data.data.icp;
  });
});
</script>
<style scoped>
footer {
  width: 100%;
  min-width: 1200px;
  height: 150px;
  background-color: #3483ff;
  opacity: 1;
  border-radius: 0px;
}
.footer-main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1200px;
  height: 100%;
  color: #ffffff;
  margin: auto;
}
.footer-xlx {
  width: 110px;
  height: 150px;
  opacity: 1;
}
.footer-xlx img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.footer-factory {
  width: 130px;
  height: 150px;
  margin: 0 20px;
}
.footer-factory img {
  width: 100%;
  height: 100%;
}
.copyright {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.copy-top {
  display: flex;
  font-size: 14px;
  margin: 0 10px 10px 50px;
}
.copy-top li {
  list-style-type: none;
  margin: 0 10px;
  color: #ffffff;
}
.copy-bottom {
  font-size: 12px;
}
.copy-bottom a {
  color: #ffffff;
  text-decoration: underline;
  padding-left: 10px;
}
.wx {
  margin-left: 20px;
  width: 80px;
  height: 100px;
  font-size: 12px;
}
.wx img {
  width: 100%;
  height: 100%;
}
.wx-dsc {
  padding-top: 5px;
  text-align: center;
}
.copy-user {
  margin-top: 10px;
  text-align: center;
}
.copy-user a {
  text-decoration: none;
  color: #ffffff;
}
</style>

```

### 组件的异步加载

安装vueuse
```
npm i @vueuse/core
```
使用
```
// \src\views\Home.vue
<template>
  <Header></Header>
  <NavSwiper></NavSwiper>
  <div ref="target">
    <NewGoodCourse v-if="targetIsVisible"></NewGoodCourse>
  </div>
  <Foot></Foot>
</template>

<script setup>
import { useIntersectionObserver } from "@vueuse/core";

import Header from "../components/common/Header.vue";
import NavSwiper from "../components/home/NavSwiper.vue";
import Foot from "../components/common/Foot.vue";
const NewGoodCourse = defineAsyncComponent(() =>
  import("../components/home/NewGoodCourse.vue")
);

const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    targetIsVisible.value = isIntersecting;
  }
});
</script>

```

### 首页之判断课程等级，Mixin复用功能封装
```js
// src\mixins\courseType.js
import { ref } from "vue";
export default function () {
  let num = ref(1);
  let fav = ref(false);
  let courseTypeFn = (type) => {
    let value = "";
    let obj = { 1: "初级", 2: "中级", 3: "高级" };
    value = obj[type] ? obj[type] : type;
    return value;
  };

  return {
    num,
    fav,
    courseTypeFn,
  };
}

```

```js
<template>
  <!--  src\components\home\NewGoodCourse.vue -->
  <div class="new-course">
    <div class="content-title">
      <div class="content-title-left">
        <div class="hot">
          <div class="hot-l">HoT</div>
          <div class="hot-r"></div>
        </div>
        <div class="txt">
          <div class="txt-top">新上好课</div>
          <div class="txt-bottom"></div>
        </div>
      </div>
      <div class="more">更多</div>
    </div>
    <div class="new-course-content">
      <ul>
        <li class="course-item" v-for="item in newCourseList" :key="item.id">
          <div class="course-info">
            <div class="course-bg">
              <img :src="item.courseCover" alt="" srcset="" />
            </div>
            <div class="course-name">{{ item.courseName }}js</div>
            <div class="course-degree">
              {{ item.courseLevel }}·{{ item.purchaseCouter }}--{{
                courseTypeFn(item.courseLevel)
              }}--初级 · 386人报名
            </div>
            <!-- <div class="course-price-pri">￥{{ item.discountPrice }}24</div> -->
            <!-- 增加判断是否收费课程 -->
            <div class="course-price-zero" v-if="item.discountPrice == 0">
              <div class="pricefree">免费学习</div>
              <el-icon :size="24" color="#808080"><Brush /></el-icon>
            </div>
            <div class="course-price" v-else-if="item.isMember == 1">
              <div class="course-memberbg">
                <span class="course-member">会员免费</span>
              </div>
              <div class="price">¥ {{ item.discountPrice }}</div>
            </div>
            <div class="course-price-pri" v-else>
              <div class="price-pri">¥ {{ item.discountPrice }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { Brush } from "@element-plus/icons-vue";
import { onBeforeMount } from "vue";
import { mostNewCourse } from "../../api";
// 混入
import courseType from "../../mixins/courseType";
let { courseTypeFn } = courseType();
//  新上好课的数据
let newCourseList = ref([]);
onBeforeMount(() => {
  const data = {
    pageNum: 1,
    pageSize: 8,
  };
  mostNewCourse(data).then((res) => {
    newCourseList.value = res.data.pageInfo.list;
  });
});
</script>

<style scoped>
.new-course {
  width: 1200px;
  margin: 0 auto;
  margin-top: 15px;
}
.content-title {
  display: flex;
  justify-content: space-between;
}
.content-title-left {
  display: flex;
}
.hot {
  display: flex;
  height: 38px;
}
.hot-l {
  height: 38px;
  font-size: 20px;
  padding: 0 10px;
  text-align: center;
  line-height: 38px;
  color: #ffffff;
  border-radius: 8px 0 8px 8px;
  background: linear-gradient(90deg, #ff727f 0%, #fc685c 100%);
}
.hot-r {
  width: 0;
  height: 0;
  border: 6px solid #fc685c;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
.txt {
  height: 38px;
  margin-left: 10px;
}
.txt-top {
  font-size: 24px;
  padding: 0 5px;
  color: #222;
  line-height: 30px;
  z-index: 1;
}
.txt-top::after {
  content: "";
  display: block;
  margin-top: -10px;
  border-radius: 7px;
  border-bottom: 14px solid;
  /* border-bottom: 14px solid #01a1ff; */
  border-image: -webkit-linear-gradient(90deg, #fbf84f 0%, #fea935 100%) 1 30;
  clip-path: border-box(0 0 round 5px);
}
.more {
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: #808080;
}
.new-course-content {
  width: 1200px;
  margin: 15px auto 0px auto;
}
.new-course-content ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.course-item {
  box-sizing: border-box;
  width: 285px;
  height: 280px;
  margin: 0 20px 20px 0;
  transition: margin-top 0.2s;
}
.course-item:hover {
  margin-top: -10px;
  cursor: pointer;
}
.new-course-content .course-item:nth-child(4n + 0) {
  margin-right: 0;
}
.course-info {
  width: 100%;
  height: 270px;
  background-color: #ffffff;
  box-shadow: 1px 1px 10px rgba(27, 39, 94, 0.4);
  opacity: 1;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
  text-decoration: none;
}
.course-bg {
  width: 100%;
  height: 160px;
}
.course-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.course-name {
  margin: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  overflow: hidden;
}
.course-degree {
  margin-left: 10px;
  font-size: 12px;
  color: #808080;
}
.course-price-pri {
  width: 75px;
  /* font-size: 14px; */
  margin-top: 4px;
  padding: 0 13px;
  color: rgba(255, 114, 127, 1);
  font-weight: 700;
}
.course-price-zero {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  font-size: 14px;
  margin-top: 15px;
  padding: 0 10px;
  color: rgba(53, 134, 255, 1);
}
.course-price {
  display: flex;
  align-items: center;
}

.course-memberbg {
  margin-left: 10px;
  width: 80px;
  height: 20px;
  color: #ffffff;
  background: linear-gradient(90deg, #ff928e 0%, #fe7062 99%);
  border-radius: 24px 0px 24px 0px;
}
.course-member {
  line-height: 20px;
  font-weight: 500;
  padding-left: 6px;
}
.price {
  margin-left: 5px;
  line-height: 25px;
  color: #ff727f;
  font-weight: 700;
}
</style>
```

### 课程页面
创建课程页组件Course.vue；增加对应路由；修改公共组件Header；增加转跳
```vue
<!-- src\views\Course.vue -->
<template>

</template>

```

```js
// src\router\index.js
import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: Home },
  {
    path: "/course",
    name: "Course",
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

```
```vue
<!-- src\components\common\Header.vue -->
<template>
  <header>
    <div class="header-content">
      <h1 class="content-logo">
        <img src="../../assets/logo.png" alt="" srcset="" />
      </h1>
      <div class="content-nav">
        <ul>
          <li><router-link to="/">首 页</router-link></li>
          <li v-for="item in navList" :key="item">
            <router-link :to="item.path">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="search-buy-login">
        <div class="content-search">
          <input type="text" placeholder="请输入搜索的课程" /><el-icon
            :size="22"
            color="#808080"
            ><search
          /></el-icon>
        </div>
        <div class="content-shopping">
          <el-icon :size="24" color="#808080"><ShoppingCart /></el-icon>
        </div>
        <div class="content-login">登录/注册</div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { Search, ShoppingCart } from "@element-plus/icons-vue";
let navList = ref([
  { name: "课程", path: "/course" },
  { name: "会员", path: "/member" },
]);
</script>
<style scoped>
a {
  text-decoration: none;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
}
.header-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1200px;
  min-width: 800px;
}
.content-logo {
  width: 160px;
  height: 55px;
  margin: 10px 0;
  cursor: pointer;
}
.content-logo img {
  height: 100%;
  object-fit: cover;
}
.content-nav {
  width: 340px;
  height: 75px;
}
.content-nav ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 75px;
  margin: 0 0;
  padding: 0 0;
  list-style: none;
}
.content-nav ul li {
  font-size: 18px;
  color: #808080;
  cursor: pointer;
}
.search-buy-login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 650px;
}
.search-buy-login svg {
  cursor: pointer;
}
.content-search {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  width: 350px;
  height: 35px;
  background: #f0f2f4;
  opacity: 1;
  border-radius: 8px;
}
.content-search input {
  padding: 0 10px;
  width: 430px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background-color: #f0f2f4;
  color: #808080;
  font-size: 16px;
  outline: none;
}
.content-login {
  font-size: 18px;
  color: #808080;
  text-align: center;
  cursor: pointer;
}
</style>

```

### 编写课程页组件（Course.vue）布局
```vue
<!-- src\views\Course.vue -->
<template>
  <Header></Header>
  <div class="coursemain">
    <div class="course-main">
      <section class="search-container">
        <div class="search-item search-item-transition">
          <div class="title-name">课程方向</div>
          <div class="all-items">
            <el-tag class="category-pointer" effect="plain" type="info"
              >全部</el-tag
            >
            <el-tag class="category-pointer-item" effect="plain" type="info"
              >Node.js</el-tag
            >
          </div>
        </div>
        <div class="search-item search-item-transition">
          <div class="title-name">课程分类</div>
          <div class="all-items">
            <el-tag class="category-pointer" effect="plain" type="info"
              >全部</el-tag
            >
            <el-tag class="category-pointer-item" effect="plain" type="info"
              >Node.js</el-tag
            >
          </div>
        </div>
        <div class="search-item search-item-transition">
          <div class="title-name">课程难度</div>
          <div class="all-items">
            <el-tag class="category-pointer" effect="plain" type="info"
              >全部</el-tag
            >
            <el-tag class="category-pointer-item" effect="plain" type="info"
              >Node.js</el-tag
            >
          </div>
        </div>
      </section>
    </div>
    <div class="main-container">
      <div class="container-top">
        <ul class="all">
          <li class="item">综合</li>
          <li class="item split">|</li>
          <li class="item">最新课程</li>
          <li class="item split">|</li>
          <li class="item">最多购买</li>
          <li class="item split">|</li>
          <li class="item-price">
            <span>价格</span>
            <span class="arrow">
              <i class="el-icon-caret-top"></i>
              <i class="el-icon-caret-bottom"></i>
            </span>
          </li>
        </ul>
        <ul class="right">
          <li class="right-item">
            <el-radio-group>
              <el-radio label="1">免费课程</el-radio>
              <el-radio label="2">会员课程</el-radio>
            </el-radio-group>
          </li>
        </ul>
      </div>
      <div class="container-body">
        <div class="new-course-content">
          <ul>
            <li
              class="course-item"
              v-for="item in newCourseList"
              :key="item.id"
            >
              <div class="course-info">
                <div class="course-bg">
                  <img :src="item.courseCover" alt="" srcset="" />
                </div>
                <div class="course-name">{{ item.courseName }}js</div>
                <div class="course-degree">
                  {{ item.courseLevel }}·{{ item.purchaseCouter }}--{{
                    courseTypeFn(item.courseLevel)
                  }}--初级 · 386人报名
                </div>
                <!-- <div class="course-price-pri">￥{{ item.discountPrice }}24</div> -->
                <!-- 增加判断是否收费课程 -->
                <div class="course-price-zero" v-if="item.discountPrice == 0">
                  <div class="pricefree">免费学习</div>
                  <el-icon :size="24" color="#808080"><Brush /></el-icon>
                </div>
                <div class="course-price" v-else-if="item.isMember == 1">
                  <div class="course-memberbg">
                    <span class="course-member">会员免费</span>
                  </div>
                  <div class="price">¥ {{ item.discountPrice }}</div>
                </div>
                <div class="course-price-pri" v-else>
                  <div class="price-pri">¥ {{ item.discountPrice }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Foot></Foot>
</template>
<script setup>
import Header from "../components/common/Header.vue";
import Foot from "../components/common/Foot.vue";
import { onBeforeMount } from "vue";
import { mostNewCourse } from "../api";
import courseType from "../mixins/courseType";
let { courseTypeFn } = courseType();
//  新上好课的数据
let newCourseList = ref([]);
onBeforeMount(() => {
  const data = {
    pageNum: 1,
    pageSize: 8,
  };
  mostNewCourse(data).then((res) => {
    newCourseList.value = res.data.pageInfo.list;
  });
});
</script>
<style scoped>
.course-main {
  padding: 20px 0;
  width: 100%;
  height: 130px;
  background: #f3f5f9;
}
.search-container {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
}
.new-course-content {
  width: 1200px;
  margin: 15px auto 0px auto;
}
.search-item {
  display: flex;
  overflow: hidden;
  /* cursor: pointer; */
  height: 45px;
  transition: all 0.5s;
}
.search-item-transition:hover {
  height: auto;
  box-shadow: rgba(95 101 105 /10%) 0px 12px 20px 0px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255);
}
.search-item .title-name {
  position: relative;
  width: 100px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  text-align: justify-content;
  color: #333333;
  padding: 10px;
  opacity: 1;
}
.search-item .title-name::after {
  position: absolute;
  content: "";
  right: 12px;
  top: 22px;
  border: 1px solid #333;
  border-width: 0 1px 1px 0;
  width: 4px;
  height: 4px;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.search-item .all-items {
  width: calc(100% - 120px);
  min-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.title .all-list {
  /* width: 40px;
  height: 25px;
  line-height: 25px;
  border-radius: 4px;
  padding: 0 10px;
  margin-left: 10px;
  align-items: center;
  text-align: center; */
}

.category-pointer {
  height: 25px;
  line-height: 25px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  background: rgba(44, 128, 255, 0.1);
  color: #2c80ff;
}
.category-pointer-item {
  height: 25px;
  line-height: 25px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  background: none;
  color: rgba(81, 87, 89, 1);
}
.category-pointer-item:hover,
.category-pointer-item:active {
  background: rgba(44, 128, 255, 0.1);
  color: #2c80ff;
}
.main-container {
  width: 1200px;
  margin: 0 auto;
}

.container-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
.all {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
  list-style: none;
}
.all .item:first-child {
  margin-right: 20px;
}
.all .item {
  margin: 0 10px;
  cursor: pointer;
}
.right {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
  list-style: none;
}
.right .right-item {
  margin-left: 10px;
}
.right .right-items {
  margin-left: 0px;
}

.arrow {
  position: relative;
}

.arrow i:first-child {
  position: absolute;
  top: -1px;
}

.arrow i:last-child {
  position: absolute;
  top: 7px;
}

.check {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.up {
  position: absolute;
  top: 5px;
  left: 2px;
}

.down {
  position: absolute;
  top: 15px;
  left: 2px;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
}
.new-course-content ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.course-item {
  box-sizing: border-box;
  width: 285px;
  height: 280px;
  margin: 0 20px 20px 0;
  transition: margin-top 0.2s;
}
.course-item:hover {
  margin-top: -10px;
  cursor: pointer;
}
.new-course-content .course-item:nth-child(4n + 0) {
  margin-right: 0;
}
.course-info {
  width: 100%;
  height: 270px;
  background-color: #ffffff;
  box-shadow: 1px 1px 10px rgba(27, 39, 94, 0.4);
  opacity: 1;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
  text-decoration: none;
}
.course-bg {
  width: 100%;
  height: 160px;
}
.course-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.course-name {
  margin: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  overflow: hidden;
}
.course-degree {
  margin-left: 10px;
  font-size: 12px;
  color: #808080;
}
.course-price-pri {
  width: 75px;
  /* font-size: 14px; */
  margin-top: 4px;
  padding: 0 13px;
  color: rgba(255, 114, 127, 1);
  font-weight: 700;
}
.course-price-zero {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  font-size: 14px;
  margin-top: 15px;
  padding: 0 10px;
  color: rgba(53, 134, 255, 1);
}
.course-price {
  display: flex;
  align-items: center;
}

.course-memberbg {
  margin-left: 10px;
  width: 80px;
  height: 20px;
  color: #ffffff;
  background: linear-gradient(90deg, #ff928e 0%, #fe7062 99%);
  border-radius: 24px 0px 24px 0px;
}
.course-member {
  line-height: 20px;
  font-weight: 500;
  padding-left: 6px;
}
.price {
  margin-left: 5px;
  line-height: 25px;
  color: #ff727f;
  font-weight: 700;
}
</style>

```
课程筛选条件分为三种情况：一级分类、二级分类、课程难度，逻辑如下：
1、直接进入课程页，展示所有一级、二级、课程难度
2、如果点击了一级，展示对应一级下的二级并展示此一级下所有课程
3、如果直接点击二级，那么一级不动，展示对应二级所有课程
4、点击一级、二级、课程难度，当前的class类要对应添加