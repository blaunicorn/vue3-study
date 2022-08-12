import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({ imports: ["vue", "vue-router"] })], // 自动导入vue和vue-router相关函数
   // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 配置前端服务地址和端口
  server: {
    host: '0.0.0.0',
    port: 8080,
    // 是否开启 https
    https: false,
    // 设置反向代理，跨域
    proxy: {
       '/api': {
       // 后台地址
             target: "http://localhost:3000",
	      changeOrigin: true,
	      rewrite: path => path.replace(/^\/api/, 'api')
      },
      "/api1": "http://testapi.tisuba.com",
      '/api2': {
      // 后台地址
      target: 'http://127.0.0.1:8956/',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api2/, '')
      }
    },
  },
});