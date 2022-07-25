import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      token: "",
      loginTimer: 0,
      userInfo:{}
    };
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setLoginTimer(timer) {
      this.loginTimer = timer;
    },
    clearToken() {
      this.token = "";
    },
  },
  // 开启数据缓存,默认sessionStorage,通过strategies配置项，可修改存储位置和key，通过paths配置项，配置 哪些参数需要持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: "demo_user",
        storage: localStorage,
        paths: ["token", "loginTimer"],
      },
    ],
  },
});
