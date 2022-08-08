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
            <span
              :style="
                categoryParams.entity.sortBy == 'price-asc' ||
                categoryParams.entity.sortBy == 'price-desc'
                  ? 'color:#2C80FF'
                  : ''
              "
              >价格</span
            >
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
  margin-top: 2px;
  padding: 20px 0;
  width: 1200px;
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
.course-item a {
  text-decoration: none;
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
