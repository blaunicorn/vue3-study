<!-- src\views\Cart.vue -->
<template>
  <div class="fixed">
    <div class="bg-color">
      <h1 class="main-shopcart">购物车</h1>
    </div>
    <div class="container">
      <div class="main">
        <div class="nav">
          <div class="left">全部课程</div>
        </div>
        <ul class="head">
          <li class="item check all">
            <el-checkbox v-model="checkAll" @change="checkAllFn"
              >全选</el-checkbox
            >
          </li>
          <li class="item class-info">课程信息</li>
          <li class="item price">单价</li>
          <li class="item count">数量</li>
          <li class="item total">金额</li>
          <li class="item action">操作</li>
        </ul>
        <div v-if="cartList.length > 0">
          <ul
            class="have-order"
            v-for="(item, index) in cartList"
            :key="item.id"
          >
            <li class="order-item">
              <el-checkbox
                v-model="item.check"
                @change="cartStore.checkItem(index)"
              ></el-checkbox>
            </li>
            <li class="order-item info">
              <div class="course-img">
                <img :src="item.courseCover" alt="" srcset="" />
              </div>
              <div class="course-name">课程一{{ item.id }}</div>
            </li>
            <li class="order-item">$10.00{{ item.discountPrice }}</li>
            <li class="order-item num">10 {{ item.counter }}</li>
            <li class="order-item totoal-price">
              $222.00{{ item.discountPrice * item.counter }}
            </li>
            <li class="order-item delete">
              <a href="javascript:;" @click="delItemFn(item.id)"
                ><el-icon><Delete></Delete></el-icon>
                <span class="deletd-text">删除</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="no-order" v-else>
          <img src="" alt="" />
          <div class="order-alert">暂无订单</div>
        </div>
        <el-divider class="line"></el-divider>
        <ul class="foot">
          <li class="foot-item">
            已选课程<span class="unique">10-{{ total.number }}</span>
          </li>
          <li class="foot-item">
            合计<span class="unique">2999-{{ total.price }}</span>
          </li>
          <li><button class="btn" @click="goOrderFn">去结算</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Delete } from "@element-plus/icons-vue";
//api
import { getShopCarList, createToken, deleteShopCart } from "@/api/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
// 导入 pinia 中的 storeToRefs 方法
import { storeToRefs } from "pinia";
//pinia
import { useCartStore } from "../store/cart";
import { watchEffect } from "vue";
// 实例化容器
let cartStore = useCartStore();
let { cartList, total, checkAll, select } = storeToRefs(cartStore);

//生命周期
onBeforeMount(() => {
  getShopCarList().then((res) => {
    cartStore.getCartList(res.data.list);
  });
});
//点击全选
const checkAllFn = () => {
  if (checkAll.value) {
    cartStore.unAll();
  } else {
    cartStore.all();
  }
};
const delItemFn = (id) => {
  ElMessageBox.confirm("确定删除该课程吗？", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let resToken = await createToken();
      let tempToken = resToken.data.token;
      if (tempToken) {
        let res = await deleteShopCart({ id }, tempToken);
        if (res.meta.code === "200") {
          ElMessage.success({
            message: "删除成功!",
          });
          // 重新获取数据
          getShopCarList().then((res) => {
            cartStore.getCartList(res.data.list);
          });
          return;
        }
      } else {
        ElMessage.success({
          message: resToken.msg,
        });
      }
    })
    .catch(() => {
      ElMessage.info({
        message: "已取消删除",
      });
    });
};
//去结算
let router = useRouter();
const goOrderFn = () => {
  router.push({ name: "ConfirmOrder" });
};
</script>
<style scoped>
.fixed {
  width: 1200px;
  height: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  margin: 0 auto;
}
ul,
li {
  list-style: none;
  margin: 0 0;
  padding: 0 0;
}
.bg-color {
  width: 100%;
  height: 200px;
  background-color: #ff0000;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  /* text-align: center; */
}
.bg-color h1 {
  padding-left: 20px;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.main-shop {
  position: relative;
  display: flex;
  align-content: center;
}
.main-shop i {
  font-size: 35px;
  padding: 20px 10px 0 0;
  color: #ff4400;
  font-weight: bold;
}
.main-shopcart {
  width: 1200px;
  margin: 0 auto;
  height: 42px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 35px;
  color: #ffffff;
  padding: 30px 0;
  opacity: 1;
}
.container {
  width: 1150px;
  margin: -100px auto 50px auto;
  background: #ebedf2;
  border-radius: 12px;
  box-shadow: 0px 2px 5px #888888;
}
.main {
  padding: 20px;
  border-radius: 5px;
}
.nav {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e6e6e6;
}
.nav .left {
  width: 80px;
  height: 26px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 0px;
  color: #ff4400;
  opacity: 1;
  border-bottom: 2px solid #ff4400;
}
.nav .right {
  width: 108px;
  height: 24px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #333333;
  opacity: 0.5;
}
/* 订单列表头部开始 */
.head,
.have-order {
  display: flex;
  padding: 0 10px;
  margin: 20px 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #fcfcfc;
  opacity: 1;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px #cccccc;
}
.head .item {
  flex: 1;
  min-width: 150px;
  font-size: 14px;
  color: #333333;
}
.check .all {
  margin-right: 10px;
}
.class-info {
  width: 400px;
  color: #333333;
}
/* 订单列表头部结束 */
.have-order {
  height: 200px;
  line-height: 200px;
}
/* 订单开始 */
.have-order .order-item {
  flex: 1;
  margin: 5px;
  height: 200px;
  line-height: 200px;
  min-width: 150px;
  font-size: 16px;
  color: #333333;
}
.have-order .order-item:first-child {
  flex: 0 1 30px;
  max-width: 30px;
}
.have-order .order-item.info {
  flex: 2 0;
  display: flex;

  align-items: center;
}
.have-order .order-item.info .course-img {
  width: 80px;
  height: 80px;
}
.have-order .order-item.info .course-img img {
  width: 100%;
  height: 100%;
  border: #333333 1px solid;
  display: block;
}
.have-order .order-item.info .course-name {
  padding-left: 5px;
  width: 100px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.have-order .order-item.num {
  padding-left: 15px;
}
.have-order .order-item.totoal-price {
  color: #e2231a;
}
.have-order .order-item.delete a {
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: #00a0c6;
  text-decoration: none;
  cursor: pointer;
}
.have-order .order-item.deletd-text {
  margin-left: 5px;
}
/* 订单结束 */

/* 暂无订单开始 */
.no-order {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 200px 0;
}
.order-alert {
  height: 31px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #b5b9bc;
  opacity: 1;
  margin: 20px 120px;
}
/* 暂无订单结束 */
/* 订单合计 */
.foot {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #333333;
  margin-bottom: 10px;
}

.foot .foot-item {
  width: 120px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: #333;
}
.unique {
  margin-left: 5px;
  font-size: 24px;
  color: #ff4400;
}
.btn {
  width: 120px;
  height: 40px;
  margin-left: 20px;
  border: none;
  color: #ffffff;
  font-size: 22px;
  border-radius: 5px;
  background: #ff4400;
  cursor: pointer;
  box-shadow: 0px 3px 5px 2px #ff727f;
}
</style>
