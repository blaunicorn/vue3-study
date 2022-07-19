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
5、点击综合、最新课程、最多购买、价格高低、免费、会员课程的条件筛选，筛选出来对应符合要求的课程。
增加一个响应参数，处理相关逻辑
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
            <el-tag
              :class="
                categoryParams.entity.firstCategory === ''
                  ? 'category-pointer'
                  : 'category-pointer-item'
              "
              effect="plain"
              type="info"
              >全部</el-tag
            >
            <el-tag
              :class="
                categoryParams.entity.firstCategory === item.id
                  ? 'category-pointer'
                  : 'category-pointer-item'
              "
              effect="plain"
              type="info"
              v-for="item in firstCategorys"
              :key="item.id"
              @click="buildCondition('firstCategory', item.id)"
              >{{ item.categoryName }}Node.js</el-tag
            >
          </div>
        </div>
        <div class="search-item search-item-transition">
          <div class="title-name">课程分类</div>
          <div class="all-items">
            <el-tag class="category-pointer" effect="plain" type="info"
              >全部</el-tag
            >
            <el-tag
              :class="
                categoryParams.entity.secondCategory === item.id
                  ? 'category-pointer'
                  : 'category-pointer-item'
              "
              effect="plain"
              type="info"
              v-for="item in secondCategorys"
              :key="item.id"
              @click="buildCondition('secondCategory', item.id)"
              >{{ item.categoryName }}Node.js</el-tag
            >
          </div>
        </div>
        <div class="search-item search-item-transition">
          <div class="title-name">课程难度</div>
          <div class="all-items">
            <el-tag class="category-pointer" effect="plain" type="info"
              >全部</el-tag
            >
            <el-tag
              :class="
                categoryParams.entity.courseLevel === item.code
                  ? 'category-pointer'
                  : 'category-pointer-item'
              "
              effect="plain"
              type="info"
              v-for="item in courseLevel"
              :Key="item.code"
              @click="buildCondition('courseLevel', item.code)"
              >{{ item.text }}Node.js</el-tag
            >
          </div>
        </div>
      </section>
    </div>
    <div class="main-container">
      <div class="container-top">
        <ul class="all">
          <li
            class="item"
            :style="categoryParams.entity.sortBy == '' ? 'color:#2C80FF' : ''"
            @click="sortByFn('')"
          >
            综合
          </li>
          <li class="item split">|</li>
          <li
            class="item"
            :style="
              categoryParams.entity.sortBy == 'time-desc' ? 'color:#2C80FF' : ''
            "
            @click="sortByFn('time-desc')"
          >
            最新课程
          </li>
          <li class="item split">|</li>
          <li
            class="item"
            :style="
              categoryParams.entity.sortBy == 'purchase-desc'
                ? 'color:#2C80FF'
                : ''
            "
            @click="sortByFn('purchase-desc')"
          >
            最多购买
          </li>
          <li class="item split">|</li>
          <li class="item-price">
            <span>价格</span>
            <span class="arrow">
              <el-icon
                :style="
                  categoryParams.entity.sortBy == 'price-asc'
                    ? 'color:#2C80FF'
                    : ''
                "
                @click="sortByFn('price-asc')"
                ><caret-top
              /></el-icon>
              <el-icon
                :style="
                  categoryParams.entity.sortBy == 'price-desc'
                    ? 'color:#2C80FF'
                    : ''
                "
                @click="sortByFn('price-desc')"
                ><caret-bottom
              /></el-icon>
            </span>
          </li>
        </ul>
        <ul class="right">
          <li class="right-item">
            <el-radio-group v-model="radio" @change="changeFn">
              <el-radio label="1">免费课程</el-radio>
              <el-radio label="2">会员课程</el-radio>
            </el-radio-group>
          </li>
        </ul>
      </div>
      <div class="container-body">
        <div class="new-course-content">
          <ul v-if="courseList.length > 0">
            <li class="course-item" v-for="item in courseList" :key="item.id">
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
          <ul v-else>
            暂无数据
          </ul>
        </div>
        <div class="pages">
          <el-pagination
            background
            layout="prev,pager,next"
            :total="total"
            @current-change="queryCourse"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
  <Foot></Foot>
</template>
<script setup>
import { Brush, CaretTop, CaretBottom } from "@element-plus/icons-vue";
import Header from "../components/common/Header.vue";
import Foot from "../components/common/Foot.vue";
import { onBeforeMount, reactive } from "vue";
import {
  mostNewCourse,
  getFirstCategorys,
  getSecondCategorys,
  getSearchCourse,
} from "../api";
import courseType from "../mixins/courseType";
let { courseTypeFn } = courseType();
// 课程方向
let firstCategorys = ref([]);
// 课程分类
let secondCategorys = ref([]);

// 课程难度
let courseLevel = ref([
  { text: "初级", code: "1" },
  { text: "中级", code: "2" },
  { text: "高级", code: "3" },
]);
//  所有课程的数据
let courseList = ref([]);
// 查询课程
const queryCourseListFn = (params = { pageNum: 1, pageSize: 4 }) => {
  getSearchCourse(params).then((res) => {
    courseList.value = res.data.pageInfo.list;
    total.value = res.data.pageInfo.total;
  });
};
// 获取二级分类数据
const getSecondCategorysFn = (params = { categoryId: "-1" }) => {
  getSecondCategorys(params).then((res) => {
    secondCategorys.value = res.data.list;
  });
};
// 获取一级分类数据
const getFirstCategorysFn = () => {
  getFirstCategorys().then((res) => {
    firstCategorys.value = res.data.list;
  });
};
// 分页数据
let total = ref(0);
// 点击分页
const queryCourse = (value) => {
  const params = {
    pageNum: value,
    pageSize: 4,
  };
  queryCourseListFn(params);
};
// 既是传递 又是点击课程方向、分类、难度，对应切换class
let categoryParams = reactive({
  pageNmu: 1, // int ,默认1
  pageSize: 8, // int  默认10
  entity: {
    firstCategory: "", // string 一级分类ID
    secondCategory: "", // string 二级分类id
    tags: "", // string 知识点
    isMember: "", // string 会员课程 传1
    isFree: "", // string 免费课程 传1
    courseLevel: "", // string 课程等级 （1：初级；2：中级：3：高级）
    sortBy: "", // string 排序方式 （1：点击量倒叙：clicks-desc;2:点击量正序:clicks-)
  },
});

// 点击课程方向、分类、难度
const buildCondition = (type, id) => {
  if (type === "firstCategory") {
    // 更新二级分类
    getSecondCategorysFn({ categoryId: id });
    // 复原上次可能选择的二级分类和课程难度
    categoryParams.entity.secondCategory = "";
    categoryParams.entity.courseLevel = "";
    categoryParams.entity.isMember = "";
    categoryParams.entity.isFree = "";
    categoryParams.entity.sortBy = "";
    radio.value = 0;
    categoryParams.entity.firstCategory = id;
    //更新课程数据
    queryCourseListFn(categoryParams);
    return;
  }
  if (type === "secondCategory") {
    categoryParams.entity.secondCategory = id;
    categoryParams.entity.courseLevel = "";
    categoryParams.entity.isMember = "";
    categoryParams.entity.isFree = "";
    categoryParams.entity.sortBy = "";
    radio.value = 0;
    //更新课程数据
    queryCourseListFn(categoryParams);
    return;
  }
  if (type === "courseLevel") {
    categoryParams.entity.courseLevel = id;
    //更新课程数据
    queryCourseListFn(categoryParams);
    return;
  }
};
// 免费课程和会员课程选择绑定
let radio = ref(0);
// 免费课程和会员课程切换函数
const changeFn = (e) => {
  console.log(e);
  // if (radio.value === "1") {
  //   categoryParams.entity.isFree = 1;
  //   categoryParams.entity.isMember = "";
  //   //更新课程数据
  //   queryCourseListFn(categoryParams);
  //   return;
  // }
  // if (radio.value === "2") {
  //   categoryParams.entity.isFree = "";
  //   categoryParams.entity.isMember = 1;
  //   //更新课程数据
  //   queryCourseListFn(categoryParams);
  //   return;
  // }
};
// 也可以用wacht监听
watch(radio, (newValue, oldValue) => {
  console.log(newValue, oldValue);
  if (newValue === "1") {
    categoryParams.entity.isFree = 1;
    categoryParams.entity.isMember = "";
    //更新课程数据
    queryCourseListFn(categoryParams);
    return;
  }
  if (newValue === "2") {
    categoryParams.entity.isFree = "";
    categoryParams.entity.isMember = 1;
    //更新课程数据
    queryCourseListFn(categoryParams);
    return;
  }
});
//  排序函数
const sortByFn = (value) => {
  //更新课程数据
  categoryParams.entity.sortBy = value;
  queryCourseListFn(categoryParams);
};
onBeforeMount(() => {
  // 获取一级分类数据
  // getFirstCategorys().then((res) => {
  //   firstCategorys.value = res.data.list;
  // });
  // 获取二级分类数据
  // const params = {
  //   categoryId: -1,
  // };
  // getSecondCategorys(params).then((res) => {
  //   secondCategorys.value = res.data.list;
  // });
  // 获取所有课程
  getFirstCategorysFn();
  getSecondCategorysFn();
  queryCourseListFn();
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
  cursor: pointer;
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
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 50px auto;
}
</style>

```

### 点击课程，进入课程详情页 
新增文件
```vue
<!-- src\views\Course-Info.vue -->
<template>Course-Info id={{ $route.params.id }}</template>
```
配置路由
```js
// src\router\index.js
  {
    path: "/course-info/:id",
    name: "CourseInfo",
    component: () =>
      import(/* webpackChunkName: "CourseInfo" */ "../views/Course-Info.vue"),
  },
```
设置页面转跳
```vue
// src\views\Course.vue
            <li class="course-item" v-for="item in courseList" :key="item.id">
              <router-link :to="{ path: '/course-info/' + item.id }">
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
              </router-link>
            </li>
```
布局
```vue
<!-- src\views\Course-Info.vue -->
<!-- src\views\Course-Info.vue -->
<template>
  <!-- Course-Info id={{ $route.params.id }} -->
  <!-- pops参数{{ id }} -->
  <Header></Header>
  <div class="course-container">
    <div class="course-info-top">
      <div class="info-container">
        <ul class="route">
          <li class="route-item">
            <router-link to="/course">课程</router-link>
          </li>
          <li class="route-item">
            <el-icon><ArrowRight></ArrowRight></el-icon>
            <!-- <router-link to="/course">免费课/会员课程</router-link> -->
            <router-link to="/course">
              {{
                courseInfo.discountPrice === 0 ? "免费课" : "会员课程"
              }}</router-link
            >
          </li>
          <li class="route-item">
            <el-icon><ArrowRight></ArrowRight></el-icon>
            <!-- <router-link to="/course"> 前端路由课程</router-link> -->
            <router-link to="/course"> {{ courseInfo.courseName }}</router-link>
          </li>
        </ul>
        <!-- <div class="name">前端路由课程</div> -->
        <div class="name">{{ courseInfo.courseName }}</div>
        <div class="info">
          <div class="avater">
            <img src="../assets/img/avat62.png" alt="" srcset="" />
          </div>
          <ul class="teacher-name">
            <li class="name-item">
              张老师
              <img src="../assets/img/teacherStart.png" alt="" srcset="" />
            </li>
            <li class="name-item">金牌讲师</li>
          </ul>
          <ul class="access">
            <!-- <li class="access-item">难度</li> -->
            <li class="access-item">
              {{ courseTypeFn(courseInfo.courseLevel) }}
            </li>
            <li class="access-item">高级</li>
            <li class="access-item">·</li>
            <li class="access-item">时长</li>
            <li class="access-item">100个小时</li>
            <li class="access-item">·</li>
            <li class="access-item">学习人数</li>
            <!-- <li class="access-item">200人</li> -->
            <li class="access-item">
              {{ courseInfo.purchaseCounter + courseInfo.purchaseCnt }}人
            </li>
            <li class="access-item">·</li>
            <li class="access-item">综合评分</li>
            <li class="access-item">10.00</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="info-nav">
      <div class="nav-container">
        <div class="chapter-item" @click="active = true">
          <div :class="active ? 'active1' : ''">课程章节</div>
          <!-- <div class="active1">课程章节</div> -->
          <div :class="['line', active ? 'active2' : '']"></div>
          <!-- <div class="line active2"></div> -->
        </div>
        <div class="chapter-item" @click="active = false">
          <div :class="!active ? 'active1' : ''">下载资料</div>
          <div :class="['line', !active ? 'active2' : '']"></div>
        </div>
      </div>
    </div>
    <div class="course">
      <div class="main">
        <div class="introduction">
          <div class="desc">该课程暂无介绍</div>
          <div class="btn">
            <button class="btn-item active">立即购买</button>
            <button class="btn-item">加入购物车</button>
          </div>
        </div>
        <!-- <div v-if="active" class="video" v-for="item in 4" :key="item"> -->
        <div
          v-if="active"
          class="video"
          v-for="item in courseChapters"
          :key="item.id"
        >
          <div class="chapter-name">{{ item.chapterName }}--章节标题</div>
          <div class="chapter-desc">{{ item.description }}--章节描述</div>
          <ul class="videos">
            <!-- <li class="video-item" v-for="k in 4" :key="k"> -->
            <li class="video-item" v-for="k in item.children" :key="k.id">
              <div class="video-item-icon">
                <el-icon><VideoCamera></VideoCamera></el-icon>
              </div>
              <div class="item-name">
                <span class="shipin">视频：</span>
                <span class="chapter-name">{{ k.chapterName }}--课程标题</span>
                <span class="free" v-if="k.publicType === 2">试看</span>
              </div>
              <button class="btn-learn">开始学习</button>
              <div class="clear-float"></div>
            </li>
          </ul>
        </div>
        <div v-else class="down">
          <div v-if="attachments.length >= 0">
            <div class="source" v-for="item in attachments" :key="item.id">
              <div class="download-course">资料名称</div>
              <div class="download-btn">下载资料</div>
            </div>
          </div>
          <el-empty v-else description="该课程暂无资料"></el-empty>
        </div>
      </div>
    </div>
  </div>
  <Foot></Foot>
</template>
<script setup>
//mixin
import mixin from "../mixins/courseType.js";
let { courseTypeFn } = mixin();
//组件
import { ArrowRight, VideoCamera } from "@element-plus/icons-vue";
import Header from "../components/common/Header.vue";
import Foot from "../components/common/Foot.vue";
//api
import { getCourseDetail } from "../api";
import { onBeforeMount } from "vue";
// 切换章节和下载资料
let active = ref(true);

const props = defineProps({
  id: String,
});
// 课程id
const { id: courseId } = toRefs(props);
//课程详情的数据
let courseInfo = ref({});
//课程章节
let courseChapters = ref([]);
//课程资料 // 判断下载资料数据
let attachments = ref([]);
//生命周期
const getCourseDetailFn = (courseId) => {
  console.log(courseId);
  getCourseDetail({ courseId }).then((res) => {
    courseInfo.value = res.data.data;
    courseChapters.value = res.data.data.bizCourseChapters;
    attachments.value = res.data.data.bizCourseAttachments;
  });
};
onBeforeMount(() => {
  getCourseDetailFn(courseId.value);
});
</script>
<style scoped>
.course-container {
  width: 1200px;
  height: 100%;
  background-color: #f8fafc;
  overflow: hidden;
  margin: 0 auto;
}
.main {
  margin: 40px auto;
  width: 1200px;
  height: 100%;
}
/* 背景部分开始 */
.course-info-top {
  width: 1200px;
  height: 200px;
  background: no-repeat 50%,
    linear-gradient(
      120deg,
      #0d74bd 0%,
      rgb(215, 218, 221) 40%,
      #fff 50%,
      #1ca4be 100%
    );
}
.nav-container {
  margin: 0 auto;
  color: #333333;
  display: flex;
}
.route {
  padding-top: 20px;
  display: flex;
  font-size: 14px;
  list-style: none;
}
.route-item {
  margin-right: 5px;
  display: flex;
  align-items: center;
}

.route-item a {
  text-decoration: none;
  color: #ffffff;
}
.route-item a:hover {
  color: #f2f2f2;
}
.name {
  margin: 30px 0 10px 30px;
  font-size: 24px;
}
.info {
  display: flex;
  margin-left: 30px;
}
.info .avater {
  width: 60px;
  height: 60px;
}
.info .avater img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.teacher-name {
  margin: 8px 0 0 8px;
  list-style: none;
}
.name-item {
  display: flex;
  height: 30px;
  align-items: center;
}

.name-item img {
  margin-left: 5px;
  width: 18px;
  height: 18px;
}
.access {
  margin: 0 0 0 50px;
  display: flex;
}
.access .access-item {
  margin-right: 10px;
  line-height: 68px;
  list-style: none;
}

/* 背景部分结束 */

/* 导航栏开始 */
.info-nav {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.chapter {
  display: flex;
  font-weight: 600;
  color: #333333;
  margin-left: 50px;
  font-size: 20px;
}
.chapter-item {
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
  line-height: 80px;
  margin-right: 70px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.chapter-item .active1,
.chapter-item:hover {
  color: #388fff;
}
.chapter-item .line {
}
.chapter-item .line.active2 {
  width: 90%;
  height: 4px;
  background: #388fff;
  border-radius: 2px;
}
.course {
  margin: 0 auto;
}
/* 导航栏结束 */
/* 课程简介开始 */
.introduction {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.desc {
  padding: 20px;
  color: #474747;
  line-height: 35px;
}
.btn {
  float: right;
  margin-top: 10px;
  padding: 0 20px 20px;
}
.btn-item {
  width: 120px;
  height: 40px;
  padding: 0px;
  border: 0px;
  outline: none;
  color: #f11d1d;
  border-radius: 23px;
  cursor: pointer;
  margin-right: 5px;
}
.btn .active {
  background: #f11d1d;
  color: #ffffff;
  margin-right: 10px;
}
/* 课程简介结束 */

/* 视频列表开始 */
.video {
  margin: 20px 0;
  padding: 20px;
  width: 1170px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.video .chapter-name {
  font-weight: bold;
  font-size: 20px;
  color: #333333;
}
.video .free {
  padding-left: 20px;
  font-size: 14px;
  color: #388fff;
}
.video .chapter-desc {
  margin: 10px 0;
  font-size: 13px;
  color: #5c5c5c;
}

.videos {
  margin-left: 0;
  padding-left: 0;
}
.video-item {
  height: 40px;
  line-height: 40px;
  padding: 5px 0;
  border-radius: 8px;
  list-style: none;
}
.video-item:hover {
  cursor: pointer;
  background-color: rgba(53, 133, 255, 0.2);
  border-radius: 8px;
  color: #388fff;
}
.video-item .video-item-icon,
.video-item .item-name {
  float: left;
  padding-left: 10px;
  line-height: 40px;
  height: 40px;
}
.video-item .video-item-icon {
  line-height: 45px;
  height: 10px;
  color: #388fff;
}
.video-item .shipin {
  color: #333333;
  font-weight: bold;
}
.btn-learn {
  margin: 5px 5px 0 0;
  float: right;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 0px;
  outline: none;
  color: #ffffff;
  background-color: #388fff;
  border-radius: 12px;
  cursor: pointer;
}
.clear-float {
  clear: both;
}
/* 视频目录结束 */

.down {
  margin: 10px auto;
  width: 1200px;
  height: 100%;
  padding: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
}
.source {
  margin: 2px 0;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
}
.down:first-child {
  margin: 40px 0 5px 0;
}
.download-btn {
  width: 100px;
  border: none;
  border-radius: 8px;
  margin: 5px 0;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  line-height: 30px;
  font-weight: 400;
  user-select: none;
}
</style>
```

### 用户账号密码登录页面设计
输入账号密码 加密登录，后端返回token
创建Login.vue页面
```vue
<!-- src\views\Login.vue -->
<template>
  <div class="container">
    <section>
      <div class="login-box">
        <!-- 登录框左侧 -->
        <div class="login-left">
          <a href="/" title="小" class="logo"
            ><img src="../assets/logo.png" alt="" srcset=""
          /></a>
          <div class="left-qrcode">
            <div id="qrcode">
              <canvas width="180" height="180" style="display: none"></canvas
              ><img src="" alt="" srcset="" style="display: block" />
            </div>
            <div class="qrcode-text">扫码登录</div>
          </div>
          <div class="quick-login">快捷登录</div>
          <div class="qq-wx-wb">
            <div class="wx-login">
              <a href="/oauth/login/WECHAT_OPEN" title="微信登录"
                ><i class="fa fa-weixin"></i
              ></a>
            </div>
            <div class="qq-login">
              <a href="/oauth/login/qq" title="QQ登录"
                ><i class="fa fa-qq"></i
              ></a>
            </div>
            <div class="wb-login">
              <a href="/oauth/login/weibo" title="微博登录"
                ><i class="fa fa-weibo"></i
              ></a>
            </div>
          </div>
        </div>
        <!-- 登录框右侧 -->
        <div class="login-right">
          <div class="login-form">
            <ul class="nav nav-tabs">
              <li
                class="nav-item"
                :class="isUserLogin === item.id ? 'active' : ''"
                v-for="item in tabsLoginTxt"
                :key="item"
              >
                <a href="#" @click="isUserLogin = item.id">{{ item.text }}</a>
              </li>
            </ul>
            <div class="tab-content">
              <!-- 账号登录 -->
              <div class="tab-pane fade show active" v-if="isUserLogin === 1">
                <div class="tab-main">
                  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
                    <el-form-item class="login-user" prop="username">
                      <el-icon><avatar /></el-icon>
                      <el-input
                        v-model="ruleForm.username"
                        placeholder="请输入您的用户名"
                      />
                    </el-form-item>
                    <el-form-item class="login-password" prop="userpwd">
                      <el-icon><lock /></el-icon>
                      <el-input
                        type="password"
                        v-model="ruleForm.userpwd"
                        placeholder="请输入您的密码"
                      />
                    </el-form-item>
                    <el-form-item class="login-submit">
                      <el-button type="primary" @click="userBtn(ruleFormRef)"
                        >登录</el-button
                      >
                    </el-form-item>
                    <a class="forgetpwd">忘记密码？</a>
                    <div class="login-text">
                      登录即同意相关服务条款和隐私政策 <a>《***用户服务协议》</a
                      ><a>《***隐私政策》</a>
                      若您没有账号，系统将为您自动创建账号并登录。
                    </div>
                  </el-form>
                </div>
              </div>
              <!-- 短信登录 -->
              <div class="tab-main" v-else>
                <el-form>
                  <el-form-item class="login-user" prop="phone">
                    <el-icon><Iphone /></el-icon>
                    <el-input placeholder="请输入您的手机号" />
                  </el-form-item>

                  <el-form-item class="login-Verification" prop="captcha">
                    <el-input placeholder="请输入您的验证码" />
                    <el-button
                      class="btn btn-primary sendcaptcha"
                      type="primary"
                      >发送验证码</el-button
                    >
                  </el-form-item>
                  <div class="login-submit">
                    <el-button
                      class="btn btn-primary sendcaptcha"
                      type="primary"
                      >登录</el-button
                    >
                  </div>
                  <div class="login-text">
                    登录即同意相关服务条款和隐私政策
                    <a>《小鹿线用户服务协议》</a><a>《小鹿线隐私政策》</a>
                    若您没有账号，系统将为您自动创建账号并登录。
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
//字体图标
import { Avatar, Lock, Iphone } from "@element-plus/icons-vue";
//账号登录和短信登录切换
let isUserLogin = ref(1);
//账号登录和短信登录
let tabsLoginTxt = ref([
  { id: 1, text: "账号登录" },
  { id: 2, text: "短信登录" },
]);
const loginChange = (id) => {
  current.value = id;
};
//账号密码登录
const ruleFormRef = ref("");
let ruleForm = reactive({
  username: "",
  userpwd: "",
});
let rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 11, message: "请输入3-11位用户名", trigger: "blur" },
  ],
  userpwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 11, message: "请输入3-11位密码", trigger: "blur" },
  ],
});
//账号密码点击登录
const userBtn = (formElement) => {
  if (!formElement) return;
  formElement.validate((valid, fields) => {
    if (valid) {
      console.log("用户名和密码验证成功");
    } else {
      console.log("error submit!", fields, valid);
    }
  });
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(../assets/img/loginbg.jpg) no-repeat center;
  background-size: cover;
}
section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 55, 255, 0.1);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 950px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  box-shadow: 0px 0px 5px #777;
}
.login-left {
  flex-shrink: 0;
  width: 475px;
  height: 500px;
  background-color: #388fff;
}
.login-right {
  min-width: 475px;
  height: 500px;
  background: url(../assets/img/ybbg.jpg) no-repeat center center;
  background-size: cover;
}
.nav-tabs {
  border-bottom: none;
  list-style: none;
}
/* 登录框左侧 */
.login-left {
  padding: 20px;
}
.login-left .logo img {
  width: 120px;
  height: 80px;
  object-fit: contain;
}
.left-qrcode {
  width: 200px;
  margin: 30px auto 0 auto;
}
.left-qrcode #qrcode {
  width: 200px;
  height: 200px;
  padding: 10px;
  background-color: #fff;
}
.left-qrcode #qrcode img {
  width: 100%;
  height: 100%;
}
.left-qrcode .qrcode-text {
  text-align: center;
  color: #fff;
  line-height: 35px;
  margin-top: 10px;
}
.quick-login {
  text-align: center;
  margin: 20px 0;
  color: #ddd;
}
.quick-login::before {
  content: "";
  width: 80px;
  height: 1px;
  background-color: #ddd;
  /* 这里用的inline-block ，也可以用relative 和 absoute实现 */
  display: inline-block;
  margin-bottom: 5px;
  margin-right: 10px;
}
.quick-login::after {
  content: "";
  width: 80px;
  height: 1px;
  background-color: #ddd;
  display: inline-block;
  margin-bottom: 5px;
  margin-left: 10px;
}
.qq-wx-wb {
  width: 180px;
  height: 55px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.qq-wx-wb .qq-login,
.qq-wx-wb .wx-login,
.qq-wx-wb .wb-login {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background-color: #e5ffe1;
  cursor: pointer;
}
.qq-wx-wb .qq-login a {
  color: #368afe;
}
.qq-wx-wb .wx-login a {
  color: #09bb07;
}
.qq-wx-wb .wb-login a {
  color: #d81e06;
}
/* 右侧登录表单开始 */
.login-right {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  /* flex: 0 0 350px; */
  width: 350px;
  height: 440px;
  padding: 10px 40px;
  background-color: #fff;
  box-shadow: 0 0 8px #ccc;
  border-radius: 8px;
}
.nav-tabs {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 0;
}
.nav-tabs li {
  padding: 0;
  width: 40%;
  font-size: 17px;
  font-weight: bold;
}
.nav-tabs li a {
  color: #333;
  display: block;
  height: 45px;
  line-height: 45px;
}
.nav-tabs .active {
  color: #388eff;
  border-bottom: 4px solid #388eff;
}
.tab-content .tab-pane.fade.show.active {
  color: #388eff;
}
.tab-main {
  height: 360px;
  padding: 1px 0 0 0;
}
.login-user,
.login-password,
.login-Verification {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #666;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-user i,
.login-password i {
  font-size: 18px;
  color: #666;
  margin-left: 5px;
}
.login-user input,
.login-password input {
  width: calc(100% - 30px);
  height: 35px;
  outline: none;
  color: #666;
  border: 0;
  padding: 0 5px;
}
.tab-main .el-input {
  margin-left: 5px;
  width: calc(100% - 35px);
  outline: none;
  border: 0;
}
.tab-main :deep(.el-input__inner),
.tab-main :deep(.el-input__wrapper) {
  outline: none;
  border: 0;
  box-shadow: none;
  background-color: #fff;
}
:deep(.el-form-item__error) {
  top: 120%;
}
.login-Verification .captcha {
  width: 130px;
  height: 35px;
  outline: none;
  color: #666;
  border: none;
}
.login-Verification .sendcaptcha {
  float: right;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 20px;
}
.tab-main :deep(.el-form-item__content) {
  flex-wrap: nowrap;
}
.login-submit {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-submit button {
  width: 100%;
  height: 35px;
  outline: none;
  border: none;
  letter-spacing: 5px;
  border-radius: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.forgetpwd {
  float: right;
  color: #888;
}
</style>

```
测试账号密码 test/admin23
配置路由
```js
// src\router\index.js
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
```
采用crypto-js加密,并用pinia本地化存储
```
1.安装
    npm i crypto-js
    
2. 新建aes.js文件

import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("AOWQ4P0YEC4YXUKS");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('O3V2GCL1K2HNZ9Y7');   //十六位十六进制数作为密钥偏移量

//解密方法
export function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
export function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
```
登录完成需要存储token，采用pinia和pinia持久化存储
```
1. 安装pinia和持久化存储
    npm i pinia
    npm i pinia-plugin-persist
   
2. 新增store/index.js

import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)

export default store

3. 新增store/user.js

import { defineStore } from 'pinia'
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: ''
    }
  },
  actions:{
  	setToken( token ){
  		this.token = token;
  	}	
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [{
      key: 'tisuba_user',
      storage: localStorage,
      //paths: ['token']
    }]
  }
})
```
### 短信登录
1 输入正确手机号：前端判断
2 输入正确手机号后，出现滑块，滑块验证通过才可以倒计时发送短信
3 手机号和验证码都正确后登录成功
so 验证手机号码，调用接口，写倒计时逻辑，引入验证滑块的组件


```

```
思路一
1.小拼图的初始位置y,小拼图的图片,背景图片是从后台获取
2.点击登录按钮,先调取后台接口验证这个账号登录错误是否超过3次,超过三次展示拼图弹出框,调取后台接口获取位置,图片地址
3.图片滑动之后把滑动的距离left传过来,调取后台接口验证是否滑动成功,成功调取登录接口,此时需要把left距离参数也传过去,为了安全,验证距离这一步也可以放在登录接口里一起验证,具体看业务场景
4.如果滑动不成功,自动刷新图片,重置拼图,滑动成功,且账号密码正确就直接跳转到首页
思路二 ：
一张图片变三层，底图 缺口、缺口切割出的图片
```html
<div class="slide-img-nopadding">
  <img class="slide-img" id="slideImg" src="./images/4.png">
  <div class="slide-block" id="slideBlock" style="background-image: url(&quot;./images/4.png&quot;);top: 67px;background-position: -155px -67px;opacity: 1;left: 2px;transition: left 0.6s ease 0s;"></div>
  <div class="slide-box-shadow" id="cutBlock" style="top: 67px; left: 155px; display: block;"></div>
</div>
<style>
  .slide-img-nopadding {
    position: relative;
    width: 100%;
    height: 100%;
}
  .slide-img-div img {
    width: 100%;
    height: 100%;
}
.slide-block {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 2px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-attachment: scroll;
    border: 1px solid rgba(255, 255, 0, 0.8);
    background-size: 260px 116px;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 40%), 0 0 10px 0 rgb(90 90 90 / 40%);
    box-sizing: border-box;
    z-index: 10;
}
.slide-box-shadow {
    display: none;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%) inset;
}
</style>
```
### vue3 Vite中不能使用require问题
一、安装
```cmd
yarn add -D vite-plugin-require-transform
or 
npm i vite-plugin-require-transform --save-dev
```
二、在vite.config.js中配置
```js
import { defineConfig } from 'vite' 
import requireTransform from 'vite-plugin-require-transform'; 

plugins: [
    requireTransform({
      fileRegex: /.js$|.vue$/
    }),
 ],
```
而后，重启项目

### vite不支持@

```js
<!-- vite.config.js -->
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {},
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 登录后存储token，返回之前页面，获取用户信息
token存储到本地和pinia中
然后路由转跳到页面
```vue
<!-- src\views\Login.vue -->

import { useRouter } from 'vue-router'
const router = useRouter();
router.go(-1);
```

获取用户信息，显示在header.vue中,这里有2个token，防止用户重复提交
退出登录时，清除token
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
        <div class="content-login" v-if="isLogin === false">
          <router-link to="/login">
            <span>登录</span>/<span>注册</span>
          </router-link>
        </div>
        <div class="content-login-success" v-else>
          <div class="my-course">我的课程</div>
          <div @mouseenter="isShow = true">
            <img class="avator" :src="userInfo.avatar" alt="" />
          </div>

          <!-- 滑过头像显示 -->
          <div class="user-info" v-if="isShow != true">
            <div class="user-info-top">
              <img class="avator" :src="userInfo.avatar" alt="" srcset="" />
              <div class="avator-info">
                <p>{{ userInfo.nickName }}</p>
                <div class="vip" v-if="vipInfo">
                  <img
                    :src="vipInfo.vipIcon"
                    class="vip-img"
                    :class="endTimeVip < 0 ? 'gray' : ''"
                    alt=""
                    srcset=""
                  />
                  <div class="">
                    <div class="vip-name">{{ vipInfo.vipName }}</div>
                    <div class="end-time" v-if="vipInfo.isExpired === 0">
                      {{ endTimeVip }}天到期
                    </div>
                    <div class="end-time" v-else>
                      已过期{{ Math.abs(endTimeVip) }}天
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="info-list">
              <router-link to="/"
                ><div class="info-item">
                  <img src="../../assets/img/course.png" alt="" srcset="" />
                  <p>我的课程</p>
                </div></router-link
              >
              <router-link to="/"
                ><div class="info-item">
                  <img src="../../assets/img/order.png" alt="" srcset="" />
                  <p>订单中心</p>
                </div></router-link
              >
              <router-link to="/"
                ><div class="info-item">
                  <img src="../../assets/img/message.png" alt="" srcset="" />
                  <p>我的消息</p>
                </div></router-link
              >
              <router-link to="/"
                ><div class="info-item">
                  <img src="../../assets/img/setting.png" alt="" srcset="" />
                  <p>个人设置</p>
                </div></router-link
              >
            </div>
            <div class="divider"></div>
            <div class="user-info-bottom">
              <div class="logout" @click="goLogout">退出登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { Search, ShoppingCart } from "@element-plus/icons-vue";
// 引入element-plus进行退出的提示
import { ElMessage, ElMessageBox } from "element-plus";

// 引入pinia的user模块，退出登录后清除token
import { useUserStore } from "../../store/user";

// 引入router，点击退出登录后，刷新页面
import { useRouter } from "vue-router";

import { onBeforeMount } from "vue";
// api
import { createToken, getInfo, logout } from "../../api/index";

let router = useRouter();
// 处理图片路径
const getImageUrl = (name) => {
  return new URL(`../../assets/img/${name}`, import.meta.url).href;
};
let navList = ref([
  { name: "课程", path: "/course" },
  { name: "会员", path: "/member" },
]);

//用户是否是登录状态
let isLogin = ref(false);
//用户信息
let userInfo = ref({
  avatar: getImageUrl("avat62.png"),
});
//用户vip数据
let vipInfo = ref({});
//VIP到期时间
let endTimeVip = ref();
//显示用户更多数据
let isShow = ref(false);
onBeforeMount(async () => {
  // createToken().then((res) => {
  //   console.log(res);
  // });
  const res2 = await createToken();
  const res = await getInfo({ token: res2.data.token });
  //已获取用户的信息
  if (res.meta.code === "200") {
    console.log(res);
    //用户信息
    userInfo.value = res.data.data;
    //用户vip
    vipInfo.value = res.data.data.vipInfo;
    //计算会员到期时间
    let now = new Date().getTime();
    let endTime = vipInfo.value.endTime - now;
    endTimeVip.value = Math.floor(endTime / 1000 / 60 / 60 / 24);
    //判断是否可以获取用户信息
    isLogin.value = true;
  }
});

//退出登录
const goLogout = () => {
  ElMessageBox.confirm("确定退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      logout().then((res) => {
        if (res.meta.code === "200") {
          let userStore = useUserStore();
          userStore.outLogin();
          router.go(0);
          ElMessage.success({
            message: "退出成功",
          });
        }
      });
    })
    .catch(() => {
      ElMessage.info({ message: "已取消" });
    });
};
</script>
<style scoped>
a {
  text-decoration: none;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
}
.header-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
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
  width: 450px;
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
.content-login span:hover {
  color: blue;
}
.content-login-success {
  position: relative;
  height: 53px;
  text-align: center;
  width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  color: #707070;
  font-family: Microsoft YaHei;
}
.avator {
  height: 53px;
  width: 53px;
  cursor: pointer;
  border-radius: 50%;
}
.user-info {
  width: 200px;
  height: 180px;
  background-color: #f0ebeb;
  border: 1px solid rgba(248, 250, 252, 1);
  box-shadow: 0px 5px 15px 3px #808080;
  position: absolute;
  top: 75px;
  right: 10px;
  z-index: 999;
  display: block;
  border-radius: 10px;
}

.user-info-top {
  display: flex;
  width: 100%;
  height: 80px;
  /* border-bottom: 1px solid rgba(248, 250, 252, 1); */
  justify-content: space-between;
  align-items: center;
}
.user-info-top .avator {
  width: 60px;
  height: 60px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
}
.user-info-top .avator-info {
  width: 120px;
  height: 60px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
}
.user-info-top .avator-info p {
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  margin: 0 0;
  margin-left: 0px;
}
.user-info-top .avator-info .vip {
  display: flex;
  width: 100%;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  align-items: flex-start;
  justify-content: center;
}
.vip .vip-img {
  line-height: 20px;
  width: 15px;
  height: 15px;
  margin-top: 2px;
  margin-right: 5px;
}
.vip-name {
  color: #93999f;
  line-height: 20px;
}
.end-time {
  padding-left: 2px;
  color: #ff0000;
  font-size: 12px;
  line-height: 20px;
}
.info-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.info-item {
  box-sizing: border-box;
  margin: 2px 6px;
  width: 85px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}

.info-item:hover {
  color: #0f4fda;
}
.info-item:hover img {
  color: #0f4fda;
  filter: invert(15%) sepia(90%) saturate(4615%) hue-rotate(224deg)
    brightness(91%) contrast(89%);
}
.info-item img {
  width: 20px;
  height: 20px;
}
.divider {
  border-bottom: 1px solid rgba(248, 250, 252, 1);
}
.logout {
  line-height: 30px;

  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
  cursor: pointer;
}
.vip .gray {
  -webkit-filter: grayscale(1); /* Webkit */
  filter: gray; /* IE6-9 */
  filter: grayscale(1); /* W3C */
}
</style>

```

### 下载资料