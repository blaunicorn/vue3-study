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
          <li
            v-for="item in firstList"
            :key="item.id"
            @mouseenter="mouseHover(item.id)"
            @mouseleave="mouseOut"
          >
            <router-link to="/"
              >{{ item.categoryName }}
              <el-icon color="#fff" :size="16">
                <arrow-right />
              </el-icon>
            </router-link>
            <div class="cateory-detail" v-if="isFirst">
              <div class="detail-main">
                <div class="detail-desc">基础知识</div>
                <div class="detail-list">
                  <div class="list-know">知识点：</div>
                  <div class="list-ul">
                    <router-link
                      to="/"
                      class="list-item"
                      v-for="item in tagsList"
                      :key="item.id"
                      >{{ item.tagName }}</router-link
                    >
                  </div>
                </div>
                <div class="detail-class">
                  <div
                    class="course-card"
                    v-for="item in searchCourseList"
                    :key="item.id"
                  >
                    <div class="course-image">
                      <img :src="item.courseCover" alt="" />
                    </div>
                    <div class="right">
                      <div class="course-name">{{ item.courseName }}</div>
                      <div class="course-degree">
                        {{ item.courseLevel }} ·
                        {{ item.purchaseCounter + item.purchaseCnt }}人购买
                      </div>
                      <div class="buy">
                        <div class="buy-free">
                          <div class="course-price">
                            <div class="course-member">会员专享</div>
                            <div class="price">￥{{ item.discountPrice }}</div>
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
            <!-- <h3 text="2xl" justify="center">{{ item.imageUrl }}</h3> -->
            <a :href="item.href"> <img :src="item.imageUrl" /></a>
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
import { onBeforeMount } from "vue";
import {
  getFirstCategorys,
  getTagsList,
  getSearchCourse,
  getSliders,
} from "@/api/index.js";

let slidersList = ref([
  {
    imageUrl:
      "https://oss.xuexiluxian.cn/xiaoluxian-vcr/8c6ee4cf7fb54425987871b9a2f52f2e.png",
    href: "https://www.xuexiluxian.cn/course/detail/bc669b67e3594bf8a0003e8145de13ea",
  },
  {
    imageUrl:
      "https://oss.xuexiluxian.cn/xiaoluxian-vcr/1985d6893e044996bf54b0a2ee904981.jpg",
    href: "https://www.xuexiluxian.cn/course/detail/bc669b67e3594bf8a0003e8145de13ea",
  },
  {
    imageUrl:
      "https://oss.xuexiluxian.cn/xiaoluxian-vcr/84f13f71af004296b14d7561a67df282.jpg",
    href: "https://www.xuexiluxian.cn/course/detail/bc669b67e3594bf8a0003e8145de13ea",
  },
  {
    imageUrl:
      "https://oss.xuexiluxian.cn/xiaoluxian-vcr/84f13f71af004296b14d7561a67df282.jpg",
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

// 右侧二级分类默认隐藏
let isFirst = ref(false);

let firstList = ref([]);
let tagsList = ref([]);
let searchCourseList = ref([]);
// 鼠标移入获取二级分类，鼠标移出清除分类
const mouseHover = (id) => {
  if (!id) return;
  isFirst.value = true;
  const data = {
    pageNmu: 1, // int ,默认1
    pageSize: 10, // int  默认10
    entity: {
      firstCategory: id, // string 一级分类ID
      secondCategory: "", // string 二级分类id
    },
    // id,
  };
  console.log(data);
  // 查询标签
  tagsList.value = [];
  getTagsList(data).then((res) => {
    // console.log(res.data.pageInfo.list);
    tagsList.value = res.data.pageInfo.list;
  });
  // 查询课程
  searchCourseList.value = [];
  getSearchCourse(data).then((res) => {
    // console.log(res);
    searchCourseList.value = res.data.pageInfo.list;
  });
};
const mouseOut = () => {
  isFirst.value = false;
};
onBeforeMount(() => {
  // 获取轮播图
  getSliders().then((res) => {
    slidersList.value = res.data.list;
  });
  getFirstCategorys().then((res) => {
    // console.log(res);
    // 获取一级课程分类
    firstList.value = res.data.list;
  });
});
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
  height: 30px;
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
  height: 370px;
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
