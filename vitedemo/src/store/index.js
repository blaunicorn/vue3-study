import { createPinia } from "pinia";
// 引入插件
import piniaPluginPersist from "pinia-plugin-persist";

const store = createPinia();
// 使用插件
store.use(piniaPluginPersist);
export default store;

import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "myGlobalState",
  //开启数据缓存,默认sessionStorage,通过strategies配置项，可修改存储位置和key。
  persist: {
    enabled: true,
    strategies: [
      {
        key: "my_user",
        storage: localStorage,
        paths: ["count"],
      },
    ],
  },
  // state: 返回对象的函数
  state: () => ({
    count: 1,
    man: {
      name: "zhangsan",
      age: 18,
    },
  }),
  getters: {
    changeNum() {
      return this.count + 100;
    },
  },
  actions: {
    countPlus(num) {
      this.count += num;
    },
  },
});
