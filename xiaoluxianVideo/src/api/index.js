import request from "../utils/request";

// 获取一级分类
export function getFirstCategorys(params) {
  return request({
    url: "/api/course/category/getFirstCategorys",
    method: "get",
    params,
  });
}

// 获取二级分类
// Request Query: categoryId  // string true ； -1为all
export function getSecondCategorys(params) {
  return request({
    url: "/api/course/category/getSecondCategorys",
    params,
  });
}

// {
//   pageNmu:1,   // int ,默认1
//   pageSize: 10,  // int  默认10
//   entity: {
//     firstCategory:'',  // string 一级分类ID
//     secondCategory:'',   // string 二级分类id
//   }
// }
//查询课程标签
export function getTagsList(data) {
  return request({
    url: "/api/course/tags/list",
    method: "post",
    data,
  });
}

// 查询课程
//Request Body= {
//   pageNmu:1,   // int ,默认1
//   pageSize: 10,  // int  默认10
//   entity: {
//     firstCategory:'',  // string 一级分类ID
//     secondCategory:'',   // string 二级分类id
//     tags:'',   // string 知识点
//     isMember:'',   // string 会员课程 传1
//     isFree:'',   // string 免费课程 传1
//     courseLevel:'',   // string 课程等级 （1：初级；2：中级：3：高级）
//     sortBy:'',   // string 排序方式 （1：综合 ""：2:最新课程 time-desc；3：最多购买 purchase-desc； 4：价格降序 price-asc；5：价格升序:price-desc;点击量倒序clicks-desc;点击量正序：clicks-asc)
//   }
// }
export function getSearchCourse(data) {
  return request({
    url: "/api/course/search",
    method: "post",
    data,
  });
}

//课程详情
export function getCourseDetail(params) {
  return request({
    url: "/api/course/getDetail",
    params,
  });
}

// 图片轮播

export function getSliders(data) {
  return request({
    url: "/api/slider/getSliders",
    method: "get",
    data,
  });
}

//查询最新课程(新上好课)
export function mostNewCourse(data) {
  return request({
    url: "/api/course/mostNew",
    method: "post",
    data,
  });
}
// 用户名密码登录
export function loginByJson(data) {
  return request({
    url: "/api/u/loginByJson",
    method: "post",
    data,
  });
}

// 发送注册或登录验证码
export function sendCaptcha(params = { mobile: "" }) {
  return request({
    url: "/api/sms/sendRegisterOrLoginCaptcha",
    method: "get",
    params,
  });
}

// 手机验证码登录
export function loginByMobile(data) {
  return request({
    url: "/api/u/loginByMobile",
    method: "post",
    data,
  });
}

// 获取用户个人信息
//  请求头传用户token，params传临时token
export function getInfo(params = { token: "" }) {
  return request({
    url: "/api/member/getInfo",
    method: "get",
    params,
  });
}

// 创建临时token，每个页面进入时，访问创建临时token，在后端防止用户重复提交
export function createToken(data) {
  return request({
    url: "/api/token/createToken",
    method: "post",
    data,
  });
}
// 退出登录接口
export function logout(data) {
  return request({
    url: "/api/u/logout",
    method: "post",
    data,
  });
}

//检查是否有权限
export function courseCheckAuth(params = { courseId: "", chapterId: "" }) {
  return request({
    url: "/api/course/checkAuth",
    params,
  });
}

//下载课程资料
export function downloadAttachment(params) {
  return request({
    url: "/api/course/downloadAttachment",
    params,
    responseType: "blob",
  });
}

//播放课程
export function playCourse(params = { courseId: "", chapterId: "" }) {
  return request({
    url: "/api/player/play",
    params,
  });
}

// 获取最后一次视频播放时间记录
export function getLastHistoryByChapterId(
  params = { courseId: "", chapterId: "", memberId: "" }
) {
  return request({
    url: "/api/course/history/getLastHistoryByChapterId",
    method: "get",
    params,
  });
}

// 记录播放历史
export function recordHistory(
  data = { courseId: "", chapterId: "", memberId: "", lastTime: "" }
) {
  return request({
    url: "/api/player/play",
    method: "post",
    data,
  });
}

//获取购物车商品
export function getShopCarList() {
  return request({
    url: "/api/shopcar/getShopCarList",
  });
}

//删除购物车
export function deleteShopCart(params = { id: "" }, token) {
  return request({
    url: "/api/shopcar/deleteShopCar",
    params,
    headers: {
      token,
    },
  });
}
// 批量删除购物车
export function deleteShopCarts(data = { ids: [{ id: "" }] }, token) {
  return request({
    url: "/api/shopcar/deleteShopCars",
    method: "post",
    data,
    headers: {
      token,
    },
  });
}

//加入购物车
export function addShopCart(data = { courseId: "", memberId: "" }, token) {
  return request({
    url: "/api/shopcar/addShopCar",
    method: "post",
    data,
    headers: {
      token,
    },
  });
}

//去结算
// data [{number:0,  数量 默认为1
// id:''}]  课程ID
export function settlement(data = [{ number: 0, id: "" }], token) {
  return request({
    url: "/api/order/settlement",
    method: "post",
    data,
    headers: {
      token,
    },
  });
}
// 支付宝结算
export function alipayOrder(data = [{ number: 0, id: "" }], token) {
  return request({
    url: "/api/pay/alipay/createOrder",
    method: "post",
    data,
    headers: {
      token,
    },
  });
}
// 微信结算
export function wxpayOrder(params = [{ number: 0, id: "" }], token) {
  return request({
    url: "/api/pay/wxpay/createOrder",
    method: "get",
    params,
    headers: {
      token,
    },
  });
}
// 查询微信 微信订单状态
export function queryOrderWithWx(
  params = [{ orderNumber: orderNumber.value }],
  token
) {
  return request({
    url: "/api/pay/wxpay/queryOrderWithWx",
    method: "get",
    params,
    headers: {
      token,
    },
  });
}
// 查询支付宝，支付宝订单状态
export function queryOrderWithAli(
  data = [{ orderNumber: orderNumber.value }],
  token
) {
  return request({
    url: "/api/pay/alipay/queryOrderWithAli",
    method: "post",
    data,
    headers: {
      token,
    },
  });
}
export function getSetting(data) {
  return request({
    url: "/api/setting/get",
    method: "get",
    data,
  });
}

export function mostNew(data) {
  return request({
    url: "/api/course/category/getFirstCategorys",
    method: "post",
    data,
  });
}
