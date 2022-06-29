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
