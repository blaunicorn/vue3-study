import request from "../utils/request";

// 获取一级分类
export function getFirstCategorys(params) {
  return request({
    url: "/api/course/category/getFirstCategorys",
    method: "get",
    params,
  });
}

// 获取二级分类,即课程标签
// {
//   pageNmu:1,   // int ,默认1
//   pageSize: 10,  // int  默认10
//   entity: {
//     firstCategory:'',  // string 一级分类ID
//     secondCategory:'',   // string 二级分类id
//   }
// }
export function getTagsList(data) {
  return request({
    url: "/api/course/tags/list",
    method: "post",
    data,
  });
}

// 查询课程
// {
//   pageNmu:1,   // int ,默认1
//   pageSize: 10,  // int  默认10
//   entity: {
//     firstCategory:'',  // string 一级分类ID
//     secondCategory:'',   // string 二级分类id
//     tags:'',   // string 知识点
//     isMember:'',   // string 会员课程 传1
//     isFree:'',   // string 免费课程 传1
//     courseLevel:'',   // string 课程等级 （1：初级；2：中级：3：高级）
//     sortBy:'',   // string 排序方式 （1：点击量倒叙：clicks-desc;2:点击量正序:clicks-)
//   }
// }
export function getSearchCourse(data) {
  return request({
    url: "/api/course/search",
    method: "post",
    data,
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

export function mostNew(data) {
  return request({
    url: "/api/course/category/getFirstCategorys",
    method: "post",
    data,
  });
}
