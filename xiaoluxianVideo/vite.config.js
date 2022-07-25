import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue()]
  // 自动导入vue和vue-router相关函数
  plugins: [vue(), AutoImport({ imports: ["vue", "vue-router"] })],
  resolve: {
    alias: {
      // 设置别名
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 设置api代理
  server: {
    proxy: {
      "/api": "http://testapi.xuexiluxian.cn",
      // 突破host和origin的限制
      headers: {
        referer: "http://37383uu912.zicp.vip",
        origin: "https://y.qq.com",
      },
    },
  },
});
