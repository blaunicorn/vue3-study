<template>
  <!-- detail-{{ id }}
  <p>{{ state.newsInfo }}</p> -->
  <div class="detail">
    <van-sticky :offset-top="0">
      <van-nav-bar
        title="详情"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar
    ></van-sticky>
    <div class="header">
      <h2>{{ state.newsInfo.title }}</h2>
      <div class="info">
        <p>
          <van-icon name="eye-o"></van-icon>
          {{ formatViewCount(state.newsInfo.viewCount) }}
        </p>
        <p>{{ formatTime(state.newsInfo.createTime) }}</p>
        <a href="#" class="collect"><van-icon name="like-o"></van-icon></a>
      </div>
      <div class="description">{{ state.newsInfo.description }}</div>
    </div>
    <div class="message">
      <h2 class="title">评论列表</h2>
      <ul class="list">
        <li class="item" v-for="item in state.commentList" :key="item">
          <div class="left">
            <van-image
              width="50"
              height="50"
              :src="'https://yw.52kfw.cn' + item.userInfo.imageUrl"
            ></van-image>
          </div>
          <div class="right">
            <h2>mark by -{{ item.userInfo.name }}</h2>
            <p class="time">2022年05月12日-{{ formatTime(item.createTime) }}</p>
            <div class="infos">good!-{{ item.content }}</div>
          </div>
        </li>
      </ul>
      <van-pagination
        @change="getPageComments(id)"
        v-model="state.currentPage"
        :total-items="state.total"
        :items-per-page="state.pageSize"
      ></van-pagination>
    </div>
    <!-- 输入框 -->
    <div class="markup">
      <h2 class="title">写评论</h2>
      <van-form @submit="onSubmit">
        <van-field
          v-model="state.markup"
          name="markup"
          rows="3"
          autosize
          type="textarea"
          maxlength="150"
          placeholder="请输入留言"
          show-word-limit
          :rules="[{ required: true, message: '请填写留言信息' }]"
        ></van-field>
        <div>
          <van-button round block type="primary" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import { Notify } from "vant";
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import {
  getCommentList,
  getNewsDetailById,
  submitCommentToNews,
} from "../api/news";
import { formatTime, formatViewCount } from "../utils/index";
const props = defineProps({
  id: String,
});
let { id } = toRefs(props);
let router = useRouter();
const state = reactive({
  newsInfo: {},
  currentPage: 1,
  pageSize: 3,
  total: "1",
  commentList: [],
  markup: "",
});
const onSubmit = (values: any) => {
  console.log("submit:", values);
  let data = {
    title: "资讯评论",
    content: values.markup,
    newsId: String(id?.value),
  };
  submitCommentToNews(data).then((res) => {
    console.log(res);
    Notify({
      message: res.message,
      type: "success",
    });
    state.markup = "";
    // 调用评论列表接口，加载最新的评论信息
    getPageComments(id?.value);
  });
};
// 获取评论列表
const getPageComments = async (id: string) => {
  console.log(state.currentPage);
  let parmas = {
    pageSize: state.pageSize,
    currentPage: state.currentPage,
    newsId: id,
  };
  let res = await getCommentList(parmas);
  state.commentList = res.data.commentList;
  state.total = res.data.total;
};
// const formatTime = (val: string) => {
//   return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
// };
// const formatViewCount = (val: string) => {
//   return numeral(val).format("0,0");
// };
const getNewsDetail = (id: string) => {
  getNewsDetailById({ newsId: id }).then((res) => {
    state.newsInfo = res.data.info;
  });
};
const onClickLeft = () => {
  router.go(-1);
};
onBeforeMount(() => {
  getNewsDetail(id?.value);
  getPageComments(id?.value);
});
</script>
<style scoped>
.detail {
  background-color: #fff;
  margin-bottom: 55px;
  height: 100%;
  width: 100%;
  padding: 5px;
  overflow: auto;
}
.detail .header {
  background-color: #fff;
  padding: 5px;
}
.detail .header h2 {
  line-height: 1.4;
  font-size: 20px;
  margin-bottom: 5px;
}
.detail .header .info {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.detail .header .info p {
  margin-right: 15px;
}
.detail .header .info .collect {
  font-size: 20px;
}
.detail .header .info .red {
  color: #f00;
}
.detail .description {
  border-top: 2px solid #999;
  background-color: #fff;
  padding: 5px;
  line-height: 1.5;
  text-indent: 2em;
}
.detail .description p {
  margin-bottom: 5px;
}
.detail .message .list .item {
  display: flex;
  border-bottom: 1px solid #e4e4e4;
  padding: 5px 0;
}
.detail .message .list .item .left {
  margin-left: 5px;
  margin-right: 10px;
}
.detail .message .list .item .right {
  text-align: left;
  flex: 1;
}
.detail .message .list .item .right h2 {
  font-size: 16px;
  color: #b8b8b8;
  line-height: 16px;
}
.detail .message .list .item .right p.time {
  font-size: 12px;
  padding: 2px 0;
}
.detail .message .list .item .right .infos {
  line-height: 1.3;
  color: #000;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.detail .title {
  margin: 5px;
}
</style>
