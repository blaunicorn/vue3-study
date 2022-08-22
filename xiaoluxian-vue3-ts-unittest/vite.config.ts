import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// import path from "path";
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
   // 自动导入vue和vue-router相关函数
   plugins: [vue(), AutoImport({ imports: ["vue", "vue-router"] }), Components({
      resolvers: [VantResolver()],
    })],
  // 配置相对路径
    base: './',
      resolve: {
    alias: {
      // 设置别名
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 设置api代理
  server: {
    proxy: {
      "/api": "https://yw.52kfw.cn",
      changeOrigin: "true",
    },
  },
})
