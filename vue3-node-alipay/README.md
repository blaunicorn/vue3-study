# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## 创建并启动项目
目标：学习小鹿线的Vue + NodeJS对接支付宝沙箱，并采用vue3-ts方式。
[原始教学视频](https://www.xuexiluxian.cn/player/play?courseId=cca90027ab554ed1b902d0d94f9fe090&chapterId=06c5c0b6a2df4f8fbc1302b43ea3800f)

server 目录为服务器端

### 创建项目
```cmd
npm init @vitejs/app vue3-node-alipay
cd vue3-node-alipay
npm install
npm run dev
```
### 安装router插件
```
npm install vue-router@4 -S
npm i unplugin-auto-import -D
npm install axios -S
npm i @types/node --D
npm install qs -S
```
### 配置 src/router/index.js

```js
import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "Home", component: Home },
  {
    path: "abuout",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

```
挂在到main.js中
```js
import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

const app = createApp(App);

app.use(router);
app.mount("#app");

// createApp(App).mount("#app");
```

### 使用CSS工具——normalize.css
安装
```
npm install --save normalize.css
```
引入
```ts
// src\main.ts
import 'normalize.css/normalize.css'
```
### 配置vite
```ts 
// vite.config.ts
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

```

### 采用crypto-js加密,并用pinia本地化存储
```
1.安装
    npm i crypto-js
    
2. 新建aes.js文件

import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("AOWQ4P0YEC4YXUKS");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('O3V2GCL1K2HNZ9Y7');   //十六位十六进制数作为密钥偏移量

//解密方法
export function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
export function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
```
### 登录完成需要存储token，采用pinia和pinia持久化存储
```
1. 安装pinia和持久化存储
```
    npm i pinia
    npm i pinia-plugin-persist
```
2. 新增store/index.js
```
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)

export default store
```
3. 新增store/user.js
```
import { defineStore } from 'pinia'
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: ''
    }
  },
  actions:{
  	setToken( token ){
  		this.token = token;
  	}	
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [{
      key: 'tisuba_user',
      storage: localStorage,
      //paths: ['token']
    }]
  }
})
```

### server端
```
cd server
npm install 
npm start 
```

安装支付宝api
npm install alipay-sdk
配置文件
1. 登录到支付宝沙箱
https://openhome.alipay.com/platform/appDaily.htm?tab=info

2. 下载支付宝开发平台开发助手
https://opendocs.alipay.com/open/291/106097/

3. 支付宝登录，在工具中==》生成密钥（RSA2）
非java适用秘钥，复制公钥到 沙箱网页的公钥配置中--》保存设置

4. 回到网页，查看配置信息和 appId、支付宝网关地址

5. 保存设置

server端 配置支付宝api
```js
// server\db\alipayUtil.js
const AlipaySdk = require("alipay-sdk").default;
const alipaySdk = new AlipaySdk({
  appId: "2021000117667979", //appId
  signType: "RSA2", //签名算法
  gateway: "https://openapi.alipaydev.com/gateway.do", //支付宝网关地址
  alipayPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs0iOfNnev600HMe+FEegaaJjgk9xp1baSa1jN5/7u3qnjpt5447qnN2IsrnVWSxxmykCBLgrpex4JvxKwwvBwssKGwGFqOhShV+8QZPTpVoKtVv112m+FY1wG9b3Mq/TSXyPJvKVndPy/7cVUWF33vMSGGhw0dWcSyPaCNRsUirrYt6zK74Spsnsd9Wsx/+3Hyos0hwNM51k3Rr5sv48yC8ycOz4BVmLCXhyMvs02Ihs7KVnRoXHrXJ5iqc5IsZ00ZoCS58V6Z9jDzc+bxyoJpb4Ordyn9+WTV3agcmvGXoI5LMwfN04RBMTG2qjiOEjyq0V6p5nfI4Pl/XtlMSPOwIDAQAB", //支付宝公钥
  privateKey:
    "MIIEowIBAAKCAQEAu9Vvjq8ksuYohEyYoL8hAMLJABILRvDlI89PSKti/XcbIOzv82p2YREL3UTdWItzpEKepADr2n9NPemf+l9V9x7o68szphsJGM7RNmOPAapt4MtUwhLHmaYOI5cHyV5wcrDqGF2++Hitnh+H9Bf9/WjkNgFwEVjME3HBrNeiGPE1yTaQzyTd/8H5tQvJjQXxmYhjdL1Nm4QRFLe4PICN5jW2OknmulQmwO6TkWaYq+8eKBoc+eaXIqkNPuMu9oHsFgBkRSUC7FNRDkAaoDhaW6NfO2bnyZ0RNQeSAXVEcqVLliYKB/694OYzqQah/KiIkqW/tpaT8hKQR19A1GxJ3QIDAQABAoIBAAm95R5KWSXqJ/nMmzHjF8wZTiFxziHsxoWX7+297dFlhwOrJjrCr8cTAkGEm9JG0UWYqu+omJLpfVETt9ddcHDzqnLoRBJ+Xndp6pHekgEtHKvG/+tc2/tNEHiqEZ5RBpX8NPf0jL4ITEDiM8PmJqco9IUUiAJuT49GnBvhxydx7G1adG3LcooPkDySlMTvTpw6n7sHRwWz5WF9dduFTXZ28lMz+jI4547A/Nm/C7kbQWAMF5Lh+Td40l07rOhNMgU7IqcJ5GNfnn0msFNM9zNbrZvjjWVlTEULMEysxyg4uGsBj3KLhhZblZ6EZ5AU0xk07eZ+vYt1E6zilw7Nw0UCgYEA4j5GtMTWU47gIxceb/XKikG8gMHODFS+Ia0csOWLNMMDjTrgaCLQE1uDnil9oTnslZFRj0T/RLFJXeXwVvRAUakAwJt3cHUu82hnVIO09FFasSZ6m49QGPKfF84jtKj8pejXFc5rHgUuXOKh5098TmNE2hV3zjS+y2G8wMr2L2sCgYEA1InkM7CKA/aPkhGgbSJV37u5NcyKoO37QLeaeavT6LU0DxPgFmoXtlS7WdKQz6q5hAwXSZ9lsfxUUxS1hpf6LdzoJj+EMPxziJhtVkR7+tc6heU8VmY7rBbD9fSTBi9YT9ZIN3lycAqW7XABASLJn+9bip2INlKOqA3CIyRwJdcCgYBrOUChY7iAGXK4rrhKL58yLz17eF6DEZaat0SlweRbuSDxyjmYoQckZXbXeqqDwsQRjrGsyPKCR9ORoOxrCY+CJCqrHgNZVPBPg+eU8mbMc9IbqzTojN9VM4ea7KOXd49lwhhNyWqS67mxY+d/jPhI3ls/UHVbUTwrf8LJTGeoyQKBgEoWSxsNlf6tqvxS8qY4StDzwisTwts4OdYkak+xauv6hkwfNIT7tIpVXP2BngMV0xdJk7CRRMTXXZmcZW6meYoVMENs7qqYxbk+0RY6RzF4ZykXcIH5nyFsyiBpgfqs9E7YNlJIHnEZ7+SSn3cC5l++8x0NrtaozpucOClB4Wn/AoGBAJty2fY72PjBBxzXDyGQ6j0SpsQf+nd/2JTCm3QjiInivSLOJmG892ZUlyokwNJ0jHRv+HE3Gz6bGmq3mrhQzUUfl2H2aBU+qazKGpwS5S9qgaVuyWgFmPizt3resp7f+fPwNlNnpVXI2U0J4IgFhijd7bF6aMA+9CbSHDAoWahW", //应用私钥
});
module.exports = alipaySdk;

```