<!-- src\views\ConfirmOrder.vue -->
<template>
  <div class="confirm-order">
    <div class="bg-color">
      <div class="main-shopcart">确认订单</div>
    </div>
    <div class="main">
      <div class="info">
        <div class="head">商品信息</div>
        <div class="info-main" v-for="item in courses" :key="item.id">
          <div class="course-info">
            <div class="course-bg">
              <img :src="item.courseCover" alt="" srcset="" />
            </div>
            <div class="course-name">课程名称-{{ item.courseName }}</div>
            <div class="course-price">
              <div class="now-price">1-{{ item.discountPrice }}</div>
              <div class="old-price">2-{{ item.salePrice }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="choose">
        <h3>
          支付方式<span class="pay">{{ payment.description }}</span>
        </h3>
        <div class="choose-bg">
          <span
            class="wxpay"
            v-for="item in payModes"
            :key="item.code"
            @click="tabPayment(item)"
            ><img src="../assets/img/wxpay.png" title="微信支付" />微信支付-{{
              item.description
            }}</span
          >
          <!-- <span
            ><img
              src="../assets/img/zfbpay.png"
              title="支付宝支付"
            />支付宝支付</span
          > -->
        </div>
      </div>
      <ul class="foot">
        <li class="foot-item">
          应付<span class="unique">$299-{{ totalPrice }}</span>
        </li>
        <li>
          <button class="btn" @click="goPayment">确认订单</button>
        </li>
      </ul>
    </div>
    <!-- 二维码对话框 -->
    <el-dialog v-model="dialogVisible" width="500px">
      <div class="dialog-price">支付：<span class="price">299元</span></div>
      <div class="codeimg">
        <img :src="payurl" alt="" srcset="" />
      </div>
      <div class="alert">请您及时付款，已便订单尽快处理！</div>
      <div class="finish">
        <div class="error">支付遇到问题</div>
        <div class="success">我已支付</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElDialog, ElMessage, ElMessageBox } from "element-plus";
import { onBeforeMount, reactive } from "vue";
// api
import {
  settlement,
  alipayOrder,
  wxpayOrder,
  queryOrderWithAli,
  queryOrderWithWx,
  deleteShopCars,
  createToken,
} from "@/api/index.js";
// pinia
import { storeToRefs } from "pinia";
import { useCartStore } from "../store/cart.js";

let cartStore = useCartStore();
let { orderList, select } = storeToRefs(cartStore);

// dialog
const dialogVisible = ref(false);
// 结算的商品数据
const courses = ref([]);
// 总价格
const totalPrice = ref(0);
// 当前支付方式
let payment = reactive({
  description: "暂未选择支付方式",
});
// 支付方式列表
let payModes = ref([]);
// 支付的二维码
let orderNumber = ref("");
// 支付的订单号
let payurl = ref("");
// 定时器
let timer = ref(null);
// 选择支付的方式
const tabPayment = (item) => {
  payment.description = item.description;
  payment.code = item.code;
  if (item.code === "alipayment") {
    alipayOrder({ paModes: item.code, courses: cartStore.orderList }).then(
      (res) => {
        // console.log(res);
        payurl.value = res.data.payurl;
        orderNumber.value = res.data.orderNumber;
      }
    );
  } else {
    wxpayOrder({ paModes: item.code, courses: cartStore.orderList }).then(
      (res) => {
        // console.log(res);
        payurl.value = res.data.payurl;
        orderNumber.value = res.data.orderNumber;
      }
    );
  }
};
// 确认订单
const goPayment = () => {
  if (item.code === "alipayment") {
    timer.value = setInterval(interPaymentAli, 3500);
    dialogVisible.value = true;
  } else {
    timer.value = setInterval(interPaymentWx, 3500);
    dialogVisible.value = true;
  }
};
// 短轮询查询微信支付是否成功
const interPaymentWx = () => {
  queryOrderWithWx({ orderNumber: orderNumber.value }).then((res) => {
    if (res.meta.code === "200") {
      clearInterval(timer.value);
      ElMessage.success({
        message: "支付成功",
      });
      dialogVisible.value = false;
      createToken().then((res) => {
        // 删除购物车
        deleteShopCars({ ids: select }, res.data.token).then((res) => {
          console.log(res);
          if (res && res.meta && res.meta.code === "200") {
            // 跳转页面
            router.push({ name: "Course" });
          }
        });
      });
    }
  });
};
// 短轮询查询支付是否成功
const interPaymentAli = () => {
  queryOrderWithAli({ orderNumber: orderNumber.value }).then((res) => {
    if (res.meta.code === "200") {
      clearInterval(timer.value);
      ElMessage.success({
        message: "支付成功",
      });
      dialogVisible.value = false;
    }
  });
};
onBeforeMount(async () => {
  console.log(orderList);
  clearInterval(timer.value);
  let res = await settlement(orderList.value);
  if (res && res.meta && res.meta.code === "200") {
    courses.value = res.data.courses;
    totalPrice.value = res.data.totalPrice;
    payModes.value = res.data.payModes;
  }
});
</script>
<style scoped>
.confirm-order {
  width: 100%;
  min-width: 1200px;
  padding-bottom: 60px;
}
.bg-color {
  width: 1200px;
  height: 200px;
  background-color: red;
  background-image: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
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
.main-shopcart {
  width: 100%;
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
.main {
  margin: 0 auto;
}
.info {
  padding: 5px 0px 20px 0px;
  background: #f3f5f7;
  border-radius: 10px;
  box-shadow: 0px 2px 5px #888888;
}
.head {
  padding: 20px;
  font-size: 18px;
  color: #333333;
}
.info-main {
  margin: 10px 20px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
}
/* 课程信息 */
.course-info {
  display: flex;
  width: 100%;
  height: 160px;
  margin: 0 auto;
}
.course-bg {
  width: 280px;
  height: 160px;
}
.course-bg img {
  width: 100%;
  height: 100%;
}
.course-name {
  margin: 0 20px;
  width: 400px;
  height: 160px;
  font-size: 16px;
  color: #07111b;
  line-height: 160px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.course-price {
  margin-left: 100px;
  height: 160px;
  text-align: right;
  line-height: 160px;
}
.course-price .now-price {
  line-height: 80px;
  font-size: 18px;
  font-weight: 600;
  color: #1c1f21;
}
.course-price .old-price {
  line-height: 80px;
  padding-left: 10px;
  font-size: 14px;
  text-decoration: line-through;
  color: #93999f;
}
/* 支付开始 */
.choose {
  width: 1200px;
  margin: 0 auto;
}
.choose h3 {
  color: #222;
  font-size: 16px;
  font-weight: 400;
  padding: 0 20px;
}
.choose-bg {
  display: flex;
  margin: 20px;
}
.choose-bg span {
  margin-top: 60px;
  margin-right: 40px;
}
.payment {
  width: 130px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  line-height: 50px;
  display: flex;
  padding: 0 10px;
  align-items: center;
}
.payment i {
  font-size: 35px;
  margin-right: 10px;
}
.payment span {
  line-height: 50px;
  color: #222222;
  font-weight: bold;
}

.pay-style {
  background: url("/image/checkedVip.png") no-repeat;
  background-size: 220px 111px;
  background-position: -67px -59px;
  border: #ff470a solid 1px !important;
}
.alipayment {
  border: #bfbfbf solid 1px;
  color: #01a8eb;
}
.wxpayment {
  border: #bfbfbf solid 1px;
  color: #01af37;
}
/* 支付结束 */
.foot {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #333333;
  margin-bottom: 10px;
}
.foot-item {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.foot-item:first-child {
  margin-top: 3px;
}
.old {
  margin-left: 10px;
}
.unique {
  margin-left: 5px;
  font-size: 24px;
  color: #f01414;
}
.btn {
  margin-right: 20px;
  width: 150px;
  height: 50px;
  border: none;
  color: #ffffff;
  font-size: 20px;
  border-radius: 5px;
  background: #f01414;
  cursor: pointer;
  box-shadow: 0px 3px 5px 2px #ff727f;
}
/* 结算 */
.pay-dialog {
  text-align: center !important;
  border-radius: 10px !important;
}
:deep(.el-dialog) {
  text-align: center !important;
  border-radius: 10px !important;
}
.dialog-price {
  padding-bottom: 20px;
  color: #93999f;
}
.dialog-price .price {
  color: #f01414;
}
.pay {
  font-size: 18px;
  padding-left: 10px;
  color: #f01414;
}
.codeimg {
  margin: 0 auto;
  border: #d2d2d2 solid 1px;
  width: 150px;
  height: 150px;
}
.codeimg img {
  width: 100%;
  height: 100%;
}
.alert {
  padding: 20px 0;
  font-size: 14px;
  color: #93999f;
}
.finish {
  width: 170px;

  line-height: 30px;
  margin: 0 auto;
  display: flex;
}
.success {
  margin-left: 20px;
  width: 70px;
  font-size: 12px;
  background: rgba(54, 137, 255, 0.22);
  color: #3692ff;
  cursor: pointer;
  border-radius: 8px;
}
.error {
  width: 100px;
  font-size: 12px;
  background: linear-gradient(90deg, #fc7979 0%, #da4848 100%);
  color: #ffffff;
  cursor: pointer;
  border-radius: 8px;
}
</style>
