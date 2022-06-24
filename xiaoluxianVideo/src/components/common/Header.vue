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