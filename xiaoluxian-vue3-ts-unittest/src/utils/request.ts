import  axios from "axios";
import { Notify } from "vant";

// 创建实例对象
const instance = axios.create({
  baseURL:'/',
  timeout:5000,
})

// 添加请求拦截器
instance.interceptors.request.use(function (config: any) {
    // 在发送请求之前做些什么
    //     const userStore = useUserStore();
    // let token = userStore.token;
    let token = localStorage.getItem('testToken')
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  }, function (error: any) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response: any) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (![200,301,304].includes(response.data.statusCode) ) {
      Notify({
        message:'系统繁忙！',
        type: 'danger'
      })
      return response
    }
    return response.data;
  }, function (error: any) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance