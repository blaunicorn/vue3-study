# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

- vantUI
- less 
- axios

### 安装
```cmd 
npm init Vite xiaoluxian-vue3-ts-unittest
cd xiaoluxian-vue3-ts-unittest
npm install
npm run dev

安装插件
npm install vue-router@4 -S
npm i unplugin-auto-import -D
npm install axios -S
npm install vant
npm i unplugin-vue-components -D
npm install --save nprogress
```

vite.config.ts 配置
```ts
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
      "/api": "http://testapi.xuexiluxian.cn",
      // 突破host和origin的限制
      headers: {
        referer: "http://37383uu912.zicp.vip",
        origin: "https://y.qq.com",
      },
    },
  },
})

```
项目初始化---样式重置

