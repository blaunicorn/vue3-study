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
                <span
                  class="free"
                  v-if="k.publicType === 2"
                  @click="goPlay(item, k.id)"
                  >试看</span
                >
              </div>
              <button class="btn-learn" @click="goPlay(item, k.id)">
                开始学习
              </button>
              <div class="clear-float"></div>
            </li>
          </ul>
        </div>
        <div v-else class="down">
          <div v-if="attachments.length >= 0">
            <div class="source" v-for="item in attachments" :key="item.id">
              <div class="download-course">资料名称</div>
              <div class="download-btn" @click="downloadDocuments(item)">
                下载资料
              </div>
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
//组件
import { ArrowRight, VideoCamera } from "@element-plus/icons-vue";
// 引入element-plus进行退出的提示
import { ElMessage, ElMessageBox } from "element-plus";
import Header from "../components/common/Header.vue";
import Foot from "../components/common/Foot.vue";
//api
import { getCourseDetail, courseCheckAuth, downloadAttachment } from "../api";
import { onBeforeMount } from "vue";
// 引入pinia的user模块
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { downloadBlobFile } from "@/utils/request";
// 混入函数
let { courseTypeFn } = mixin();

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
const router = useRouter();
// 下载资料
const downloadDocuments = async (item) => {
  // 查询是否登录状态，如果登录正常走下面流程，如果没有登录，跳转到登录页
  if (!useUserStore().token) {
    ElMessage.info({
      message: "请先登录",
    });
    router.push({ name: "Login" });
    return;
  }
  // 查询是否有权限下载，（比如是否购买了本课程）
  let res = await courseCheckAuth({ courseId: item.courseId });
  if (!res || !res.data.data.hasAuth) {
    ElMessage.info({
      message: "购买该课程后才能下载资料哦",
    });
    return;
  }
  downloadAttachment({
    courseId: item.courseId, //课程ID
    attachmentId: item.id,
  }).then((res) => {
    let fileName = item.attachmentName;
    let fileUrl = item.attachmentUrl;
    const extName = fileUrl.substring(fileUrl.lastIndexOf("."));
    fileName = fileName + extName;
    downloadBlobFile(res, fileName);
  });
};
const goPlay = async (item, chapterId) => {
  // 查询是否登录状态，如果登录正常走下面流程，如果没有登录，跳转到登录页
  if (!useUserStore().token) {
    ElMessage.info({
      message: "请先登录",
    });
    router.push({ name: "Login" });
    return;
  }
  // 查询是否有播放下载，（比如是否购买了本课程）
  let res = await courseCheckAuth({ courseId: item.courseId });
  if (!res || !res.data.data.hasAuth) {
    ElMessage.info({
      message: "购买该课程后才能观看视频哦",
    });
    return;
  }
  router.push({
    name: "CoursePlay",
    params: { courseId: item.courseId, chapterId: chapterId },
  });
};
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
