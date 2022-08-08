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
        <div class="content-shopping" @click="goCart">
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
          <div class="user-info" v-if="isShow == true">
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
  let token = useUserStore().token;
  if (!token) {
    return;
  }

  const res = await getInfo({ token: res2.data.token });
  //已获取用户的信息
  if (res.meta.code === "200") {
    console.log(res);
    //用户信息
    userInfo.value = res.data.data;
    //pinia直接存储用户信息;
    useUserStore().userInfo = res.data.data;
    //用户vip
    vipInfo.value = res.data.data.vipInfo;
    //计算会员到期时间
    let now = new Date().getTime();
    let endTime = vipInfo.value.endTime - now;
    endTimeVip.value = Math.floor(endTime / 1000 / 60 / 60 / 24);
    //判断是否可以获取用户信息
    isLogin.value = true;
  } else {
    ElMessage({
      type: "warning",
      message: res.meta.msg,
    });
    //用户信息
    userInfo.value = "";
    //pinia直接存储用户信息;
    useUserStore().userInfo = "";
    useUserStore().clearToken();
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
          // 清除token
          let userStore = useUserStore();
          userStore.clearToken();
          // 返回首页
          // router.go(0);
          router.push({ path: "/" });
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
// 进入购物车页面
const goCart = () => {
  router.push({ name: "Cart" });
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
