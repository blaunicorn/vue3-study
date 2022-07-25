import axios from "axios";

// 引用store
import { useUserStore } from "../store/user";

//1. 创建axios对象
const service = axios.create();

//2. 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    let token = userStore.token;
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//3. 响应拦截器
service.interceptors.response.use(
  (response) => {
    //判断code码
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;

// 通用下载方法
export function downloadBlobFile(data, fileName) {
  if (!data) {
    console.log("下载文件失败-文件为空!");
  }
  const blob = new Blob([data], {
    // type值如后台设置，前端可省略，具体type值可参考https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    type: "application/octet-stream",
  });
  if (blob.size <= 0) {
    console.log("下载文件大小为零！");
  }
  const downloadElement = document.createElement("a"); //创建a标签
  const createObjectURL = function (blob) {
    return window[window.webkitURL ? "webkitURL" : "URL"]["createObjectURL"](
      blob
    );
  };
  const href = createObjectURL(blob); //创建DOMString
  const filename = fileName || "测试下载"; //设置文件名字
  downloadElement.style.display = "none"; //隐藏a标签
  downloadElement.href = href; //赋值a标签的href
  downloadElement.target = "_blank";
  downloadElement.download = filename; //下载后文件名
  document.body.appendChild(downloadElement); //插入a标签
  downloadElement.click(); //点击下载
  window.URL.revokeObjectURL(href); //释放掉blob对象
  document.body.removeChild(downloadElement); //下载完成移除元素
}

// 使用 XMLHttpRequest 对象获取图片url的Blob值
//获取图片的Blob值
function getImageBlob(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    if (this.status == 200) {
      if (cb) cb(this.response);
    }
  };
  xhr.send();
}
// 注意这里的XMLHttpRequest必须使用异步模式，同步模式不能设置 responseType = "blob"
// 使用 FileReader 对象获取图片 Blob 对象的 data 数据

function preView(url) {
  let reader = new FileReader();

  getImageBlob(url, function (blob) {
    reader.readAsDataURL(blob);
  });

  reader.onload = function (e) {
    var img = document.createElement("img");
    img.src = e.target.result;
    document.body.appendChild(img);
  };
}
