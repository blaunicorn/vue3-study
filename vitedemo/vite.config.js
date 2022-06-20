import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({ imports: ["vue", "vue-router"] })], // 自动导入vue和vue-router相关函数
  resolve: {
    alias: {
      // 设置别名
      "@": path.resolve(__dirname, "src"),
    },
  },
});
