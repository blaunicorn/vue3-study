<template>
  <!-- <h2>{{ msg }}</h2>
  <div style="">
     <van-button type="primary" @click="getNewsListHandler">获取资讯</van-button>
  <van-button type="primary" @click="goHomeHandler">前往首页</van-button>
  </div> -->
  <div class="warp"></div>
  <van-swipe
    class="my-swipe"
    :autoplay="3000"
    indicator-color="white"
    lazy-render
  >
    <van-swipe-item v-for="image in state.bannerList" :key="image"
      ><img :src="image.imageUrl"
    /></van-swipe-item>
  </van-swipe>
  <!-- 选项卡 -->
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab :title="item.title" v-for="item in state.cateList" :key="item._id">
      <!-- [{{ item.title }}]-{{ state.newsList }} -->
      <!-- newsItem -->
      <div v-for="item in state.newsList" :key="item._id">
        <ul class="news-detail-item" :key="item._id" @click="showDetail(item)">
          <li class="left">
            <h2>{{ item.title }}</h2>
            <p>
              <van-icon name="eye-o">{{ item.viewCount }}阅读</van-icon>
            </p>
            <p>
              <i class="fa fa-calandar" aria-hidden="true"></i
              >{{ formatTime(item.createTime) }}
            </p>
          </li>
          <li class="right">
            <img :src="img_prefix_url + item.imageUrl" alt="" />
          </li>
        </ul>
      </div>
    </van-tab>
  </van-tabs>
</template>
<script setup lang="ts">
import { Notify, Toast } from "vant";
import { onBeforeMount, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import * as dayjs from "dayjs";
import {
  getBannersByPost,
  getNewsCategory,
  getNewsList,
  getNewsListBCateId,
  getPost,
} from "../api/news";

let router = useRouter();
let msg = ref("news");
const images = ref([
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
]);
// 调用轮播图接口，获取轮播图信息
const getNewsListHandler = async () => {
  let res = await getNewsList({
    currentPage: 1,
    pageSize: 10,
    cate_id: "科技兴国",
  });
  console.log(res);
};
const active = ref(0);
const img_prefix_url = ref("https://yw.52kfw.cn/");
const state = reactive({
  bannerList: [],
  cateList: [],
  newsList: [],
});
const formatTime = (value: string) => {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
};
const showDetail = (item) => {
  router.push({ name: "Detail", query: { id: item._id } });
};
const getBanners = async () => {
  let res = await getPost();
  // console.log(res);
  if (res.statusCode === 200 && res.data.bannerPos.length > 0) {
    let res2 = await getBannersByPost({ id: res.data.bannerPos[2]._id });
    state.bannerList = res2.data.info.banners;
    if (res2.statusCode == 200) {
      Toast({
        message: "顶部展示",
        position: "top",
      });
    } else {
      Notify({ type: "warning", message: "获取失败" });
    }

    console.log(state);
  }
};
const getCategory = async () => {
  let res = await getNewsCategory({});
  state.cateList = res.data.list;
  console.log(state);
};
const goHomeHandler = () => {
  router.push({ name: "Home" });
};
const onClickTab = async ({ title }) => {
  let res = await getNewsListBCateId({ cate_id: title });
  state.newsList = res.data.list;
};
// 监听分类列表，获取当前分类的数据
watch(
  () => state.cateList,
  (newVal, oldVal) => {
    console.log(111, newVal, oldVal);
    if (newVal) {
      onClickTab({ title: newVal[0].title });
    }
  }
);
onBeforeMount(() => {
  getBanners();
  getCategory();
  // onClickTab({ title: "国家事实" });
  // getNewsListHandler();
});
</script>
<style scoped>
.wrap {
  margin-bottom: 50px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  height: 200px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.news-detail-item {
  display: flex;
  border-bottom: 1px solid #e4e4e4;
  padding: 0.3rem;
  justify-content: space-between;
}
.news-detail-item .left {
  display: flex;
  flex-direction: column;
  margin-right: 0.6rem;
  width: 60%;
  align-items: center;
  justify-content: center;
}
.news-detail-item .left h2 {
  font-size: 1rem;
  line-height: 1.2;
  color: #1a1a1a;
  font-weight: normal;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.news-detail-item .left p {
  color: #949494;
  margin: 3px;
}
.news-detail-item .right {
  width: 40%;
  display: flex;
  justify-content: center;
}
.news-detail-item .right img {
  width: 100%;
  height: auto;
}
</style>
