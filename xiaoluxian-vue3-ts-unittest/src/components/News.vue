<template>
  <h2>{{ msg }}</h2>
  <div style="">
     <van-button type="primary" @click="getNewsListHandler">获取资讯</van-button>
  <van-button type="primary" @click="goHomeHandler">前往首页</van-button>
  </div>
 
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { getNewsList } from "../api/news";

let router = useRouter();
let msg = ref("news");
const getNewsListHandler = async () => {
  let res = await getNewsList({
    currentPage: 1,
    pageSize: 10,
    cate_id: "科技兴国",
  });
  console.log(res);
};
const goHomeHandler = () => {
  router.push({ name: "Home" });
};
onBeforeMount(() => {});
</script>
<style scoped></style>
