<template>
  <!-- Home -->
  <!-- <VanButton type="primary" @click="goProfile">前往用户中心</VanButton> -->
  <router-view></router-view>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" value="0" to="/home/news"
      >资讯</van-tabbar-item
    >
    <van-tabbar-item icon="smile-o" value="1" to="/home/knowledge"
      >知识库</van-tabbar-item
    >
    <van-tabbar-item icon="friends-o" value="2" to="/home/profile"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
let active = ref(0);

const goProfile = () => {
  router.push({
    name: "Profile",
    // query: { id: 1, name: "andy", mail: "123@234.com" },
    params: { id: 1, name: "andy", mail: "123@234.com" },
  });
};
</script>
