# Vue 3 + Vite


## 创建 vue3 项目，基于 vite

npm init @vitejs/app appname
npm install vue-router@4

### vue3 基于 webpack 改 vite

1、复制 scr 目录
2、复制 package.json 中的 dependencies
3、npm i 安装依赖，并 npm run dev 修改 bug

### vue2 基于 webpack 改 vite

1、复制 scr 目录
2、复制 package.json 中的 dependencies
3、npm i 安装依赖，
4、安装报错的 npm install @vue/compiler-sfc vue-template-compiler -S 和 npm install vite-plugin-vue2 -D
5、vite.config.js 修改

```js
import { defineConfig } from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2'

export default {
  plugins: {
    createVuePlugin()
  }
}
```

5、npm run dev 修改路径、router 等 bug

## vue2 和 vue3 区别

vue2 采用 Object.defineProperty(),1、不能监听数组的变化，2、必须遍历对象每一个属性
vue3 采用 proxy， 不需要遍历对象每一个属性。

## vue3

### ref() 基本类型

### reactive() 对象

### setup 语法糖插件：unplugin-auto-import 解决场景：在组件开发中无需每次都手动引入
yarn  add unplugin-auto-import -D
```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({ imports: ["vue", "vue-router"] })], // 自动导入vue和vue-router相关函数
});
```

### toRefs 用于 解构对象、数组时 保持响应状态。
```js
obj=Reactive{
  name:'san',
  sex:1
}
return {
  ...toRefs(obj)
}
```
### computed,可以用get()\set()

```js
let msg = ref("sdfsfsere fs");
let msgchange = computed(() => {
  return msg.value.slice(1, 3);
});
return {
  msg,
  msgchange,
};
```
### watch
```js
// vue2
<template>
  <div><input type="text" name="" v-model="msg">{{msg}}</div>
</template>
<script>
export default {
  data() {
    return {
      msg:'hello',
      obj: {
        a:1
      }
    }
  },
  watch: {
  msg(newVal,oldVal) {
    console.log(newVal,oldVal)
  },
  obj: {
    handler(newVal,oldVal) {
      console.log(newVal,oldVal)
    },
    immediate: true,  // 获取初始化的值
    deep:true   // 深度获取
  }
}
}
</script>
```

```js
// vue3 
<template>
  <div><input type="text" name="" v-model="msg">{{msg}}</div>
  <div><input type="text" name="" v-model="str">{{str}}</div>
</template>
<script setup>
export default {
  setup() {

    let msg = ref("hello");
    let str = ref("oo")
    let obj= reactive({
      a:2,
      arr:['a','b','c']
    })
    // 方式一,单独监听
    watch(msg,(newVal,oldVal) {
      console.log(newVal,oldVal)
    },{immediate:true})                 // hello,undefined
    // 方式二，监听多个值，一起监听
    watch([msg,str],(newVal,oldVal) {
      console.log(newVal,oldVal)
    },{immediate:true})  
    //  监听对象的  某个属性             
    watch(()=>obj.arr,(newVal,oldVal) {
      console.log(newVal,oldVal)
    },{immediate:true})                 

    return {
      msg
    }
  }
}
</script>
```
组合监听
```js
const nums = ref(9)
const demo = reactive({
	name: '前端小玖',
	nickName: '小玖',
	soulmate: {
		name: '',
		nickName: ''
	}
})
```
什么是组合监听呢？举个例子，比如我想同时监听 demo 对象的 name 属性，和基础类型 nums，只要他们其中任何一个发生变更，那么就触发 watch 方法。
```js
watch([() => demo.name, nums], ([newName, newNums], [oldName, oldNums]) => {
	console.log('watch 已触发: name', newName)
	console.log('watch 已触发: nums', newNums)
})
```
注意，此时的第一个参数是一个数组，且第二参数箭头函数的参数也是数组的形式。

#### 路由
useRoute => this.route 
useRouter => this.router
```js
import { useRouter } from 'vue-router';
let router = useRouter()
  let go =()=> {
    router.push('/about')
  }
```
```js
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});
```

### 组件传值 父传子
#### vue2、vue3通用方式
```js
//  father
<template>
<div>
<div>
 <span>父组件数据</span>
  <input v-model="msg"/>
 </div>
这是父组件,htmlz中需要用kebab-case命名，字符串模板没有这一限制
<Son :for-child-msg="msg"></Son>  
</div>
</template>
<script>
import Son from '../components/Son.vue'
export default {
  components: {
    Son
  },
  data() {
    return {
      msg:'这是父传给子的数据'
    }
  }

}
</script>
```
```js 
// Son
<template>
<div>
这是son组件
{{msg}}
</div>
</template>
<script>
export default {
  props:{'forChildMsg':String}
  data() {
    return {
      ownChildMsg:this.forChildMsg
    }
  },
  watch: {
    forChildMsg() {
      this.ownChildMsg = this.forChildMsg
    }
  }
}
</script>
```
#### 修改 props 数据
1.定义一个局部变量，并用 prop 的值初始化它,只有默认值传递给了 ownChildMsg，父组件改变只会变化到 forChildMsg，不会修改 ownChildMsg。
```js
  props: {
    "for-child-msg": String
  },
  data() {
    return { ownChildMsg: this.forChildMsg };
  }
  ```
2. 定义一个计算属性，处理 prop 的值并返回
  ```js 
props: {
    "for-child-msg": String
  },
  computed: {
    ownChildMsg() {
      return this.forChildMsg + "---ownChildMsg";
    }
  }
  ```
3. 最推荐的方式是使用变量存储 prop 的初始值，并用 watch 来观察 prop 值得变化。发生变化时，更新变量的值。
   ```js 
  props: {
    "for-child-msg": String
  },
  data() {
    return {
      ownChildMsg: this.forChildMsg
    };
  },
  watch: {
    forChildMsg() {
      this.ownChildMsg = this.forChildMsg;
    }
  }
   ```
#### vue3 方式一 setup语法糖方式
```js
//  father
<template>
<div>
<div>
 <span>父组件数据</span>
  <input v-model="msg"/>
 </div>
这是父组件,htmlz中需要用kebab-case命名，字符串模板没有这一限制
<Son :for-child-msg="msg"></Son>  
</div>
</template>
<script setup>
  import Son from '../components/Son.vue'
  let msg = ref('这是父传给子的数据')
</script>
```

```js 
// Son
<template>
<div>
这是son组件
{{msg}}
</div>
</template>
<script setup>
import {defineProps} from 'vue'
const props = defineProps({
'forChildMsg':{type:String,default:"111"}
})
const {forChildMsg:msg} = toRefs(props)  // 重命名解构
}
</script>

```
#### vue3 方式二 setup props接受
```js
<script lang="ts">
import { toRefs } from 'vue'
interface Data {
    [key:string]:unknown
}
export default {
    props:{
        text:{
            type:String,
            default:""
        },
        message:Number
    },
    setup(props:Data){
        const {text} = toRefs(props)
        const formatText = `Hi,${text.value}`
        return {
            formatText
        }
    }
}
</script>
```
### 组件 子传父
#### vue2子传父
```js
// Son
<template>
<div>
这是son组件
{{ownChildMsg}}
<button @click="toFatherMsg">自定义子传父</button>
</div>
</template>
<script>
export default {
  data() {
    return {
      ownChildMsg:1111
    }
  },
  methods: {
    toFatherMsg() {
      this.$emit('fn',this.forChildMsg) 
    }
  }
}
```
```js 
//  father
<template>
<div>
<div>
 <span>父组件数据</span>
  <input v-model="msg"/>
 </div>
这是父组件,htmlz中需要用kebab-case命名，字符串模板没有这一限制
<Son :for-child-msg="msg" @fn="changeMsg"></Son>  
</div>
</template>
<script>
import Son from '../components/Son.vue'
export default {
  components: {
    Son
  },
  data() {
    return {
      msg:'这是子传给父的数据'
    }
  },
    methods: {
    changeMsg(value) {
     console.log(value)  // 子组件传过的的值“1111”
     this.msg = value
    }
  }
}
```
####  vue3子传父 方式一  setup api
```js
// Son
<template>
<div>
这是son组件
{{ownChildMsg}}
</div>
<button @click="toFatherMsg">自定义子传父</button>
</template>
<script>
export default {
  data() {
    return {
      ownChildMsg:1111
    }
  },
  setup(props,{emit}) {
    let ownChildMsg = ref(100);
    const toFatherMsg = () => {
      emit('fn',toFatherMsg)
    }
  }
}
```
```js 
//  father
<template>
<div>
<div>
 <span>父组件数据</span>
  <input v-model="msg"/>
 </div>
这是父组件,htmlz中需要用kebab-case命名，字符串模板没有这一限制
<Son :for-child-msg="msg" @fn="changeMsg"></Son>  
</div>
</template>
<script>
import Son from '../components/Son.vue'
export default {
  components: {
    Son
  },
  setup () {
    let msg =ref(200)
    let     changeMsg(value) = (value)=>{
     console.log(value)  // 子组件传过的的值“1111”
     msg.value = value.value
    }
    return {
      changeMsg,
      msg
    }
  }
}
```
####  vue3子传父 方式二  setup 语法糖
```js
// Son
<template>
<div>
这是son组件
{{toFatherMsg}}
<button @click="toFatherMsg">自定义子传父</button>
</div>
</template>
<script setup lang='ts'>
let toFatherMsg = ref("111")
// const emit = defineEmits<{(e:'fn',id:number):void}>()  // ts方式
const emit = defineEmits(['fn'])  // setup方式
const toFatherMsg = () => {
      emit('fn',toFatherMsg)
    }
  }
}
```
```js 
//  father
<template>
<div>
<div>
 <span>父组件数据</span>
  <input v-model="msg"/>
 </div>
这是父组件,htmlz中需要用kebab-case命名，字符串模板没有这一限制
<Son :for-child-msg="msg" @fn="changeMsg"></Son>  
</div>
</template>
<script setup>
import Son from '../components/Son.vue'
export default {
  components: {
    Son
  },
  data() {
    return {
      msg:'这是子传给父的数据'
    }
  },
    methods: {
    changeMsg(value) {
     console.log(value)  // 子组件传过的的值“1111”
     this.msg = value
    }
  }
}
```

### 组件 v-model传值，即实现父子组件双向绑定修改
```js 
//  father
<template>
<div>
<div>
 <span>父组件数据</span>
  <input v-model="msg"/>
 </div>
这是父组件,htmlz中需要用kebab-case命名，字符串模板没有这一限制
<Son v-model:for-child-msg="msg" @fn="changeMsg"></Son>  
</div>
</template>
<script setup>
import Son from '../components/Son.vue'
export default {
  components: {
    Son
  },
  data() {
    return {
      msg:'这是子传给父的数据'
    }
  },
    methods: {
    changeMsg(value) {
     console.log(value)  // 子组件传过的的值“1111”
     this.msg = value
    }
  }
}
```

```js
// Son
<template>
<div>
这是son组件
{{toFatherMsg}}
<button @click="toFatherMsg">双向绑定的子传父</button>
这是父传子的数据：{{for-child-msg}}
</div>
</template>
<script setup >
const props = defineProps({
  'forChildMsg':{
    type:Number,
    default:20
  }
})
let toFatherMsg = ref("111")
// const emit = defineEmits<{(e:'fn',id:number):void}>()  // ts方式
const emit = defineEmits(['update:forChildMsg'])  // setup方式
const toFatherMsg = () => {
      emit('update:forChildMsg',toFatherMsg)
    }
  }
}
```

### 组件之 兄弟组件传值 20220613
1. 通过生父组件传值。大兄A传父Father，父传给二弟B
```js
// SonA.vue
<template>
  <div>
    这是sonA组件
    {{ toFatherMsg }}
    <button @click="toFather">自定义子传父</button>
    <hr>
  </div>
</template>
<script setup >
let toFatherMsg = ref("111")
// const emit = defineEmits<{(e:'fn',id:number):void}>()  // ts方式
const emit = defineEmits(['fn'])  // setup方式
const toFather = () => {
  emit('fn', toFatherMsg)
}
</script>
```
```js 
//  Father.vue
<template>
  <div>
    <router-link to="/about">关于我们</router-link>
    <button @click="go">关于我们</button>
    <hr>
    这是接收sonA传过来的值:{{msg}}
    <hr>
    <SonA @fn="forChild"></SonA>
    <SonB :forChildBMsg="msg"></SonB>

  </div>
  home
</template>
<script setup>

import { useRouter } from 'vue-router';
import SonA from '../components/SonA.vue';
import SonB from '../components/SonB.vue';
let msg = ref('father')
let router = useRouter()
  let go =()=> {
    router.push('/about')
  }
let forChild = (value)=> {
  console.log(value)
  msg.value = value.value
}
  // vue2
  // methods:{
  //   go() {
  //     this.router.push('/about')
  //   }
  // }
</script>
```
```js
// SonB.vue
<template>
  <div>
    这是sonB组件
    {{ msg }}-父组件传过来的值
    <hr>

  </div>
</template>
<script setup >
let props = defineProps({
  forChildBMsg: {
    type: String,
    default:' 0'
  }
})
const { forChildBMsg: msg } = toRefs(props)  // 重命名解构
</script>
```
2.mitt.js 兄弟传值
安装依赖
```js 
npm install mitt -S

```
新建目录 utils/bus.js
```js 
import mitt from "mitt";
const emitter = mitt();
export default emitter;

```
```js 
// SonA.vue
<template>
  <div>
    这是sonA组件
  <button @click="btn">按钮</button>
    <hr>
  </div>
</template>
<script setup >
import emitter  from '../utils/bus';
let str = ref('这是A组件的数据')
const btn = () => {
  // 触发自定义总线why，并传入一个对象
  emitter.emit('fn',str)   //  发送
}
</script>
```
```js 
// SonB.vue
<template>
  <div>
    这是sonB组件:
    {{ s }}
    <hr>
  </div>
</template>
<script setup >
import { onBeforeMount } from 'vue';
import emitter from '../utils/bus';
let s = ref('')
onBeforeMount(() => {
  emitter.on('fn', e => {   // 接收
    console.log(e)
    s.value = e.value
  })
})
</script>
```
```js
总结：

//注册并监听自定义事件

emitter.on(eventType,callback)

//触发自定义事件

emitter.emit(eventType,params)

// mitt的事件取消
// 取消所有的mitt事件
emitter.all.clear()

// 取消指定的mitt事件
// 需要取消指定事件的监听，需要将回调定义在外部，类似于setTimeout
function onFoo(){...}
emitter.on('foo',onFoo) //监听
emitter.off('foo',onFoo) //取消监听

```

### 插槽：共四种情况，匿名插槽、具名插槽、作用域插槽、动态插槽
1. 匿名插槽
```js 
// 父组件中 
    <SonA @fn="forChild">
    这是XXX数据
    这是YYY数据
    </SonA>
```
```js 
// 子组件中
  <header>
    <div>头部</div>
    <slot></slot>
  </header>
  <footer>
      <div>底部</div>
      <slot></slot>
  </footer>
```
1. 具名插槽
```js
// 父组件中 
    <SonA @fn="forChild">
    <template v-slot:first>
    这是XXX数据
    </template>
    <template v-slot:second>   // 可以简写成 #second
     这是YYY数据
    </template>
    </SonA>
```
```js 
// 子组件中
  <header>
    <div>头部</div>
    <slot name="first"></slot>
  </header>
  <footer>
      <div>底部</div>
      <slot name="second"></slot>
  </footer>
```
3. 作用域插槽：在父组件中访问子组件中才有的数据,并且在父组件中自定义渲染的结构,作用域插槽强调的则是数据作用的【范围】；作用域插槽，就是带参数（数据）的插槽；语法：<slot :自定义name=data中的属性或对象></slot>

```js
// 父组件中 
  <template>
  <div>

    <SonA @fn="forChild" :data="data">
    <template v-slot:first>
    这是XXX数据
    </template>
     <!-- 解构data -->
     <!-- 也可以简写成 #default ="{data}" -->
    <template v-slot="{data}">  
      {{data.name}}=={{data.age}}
    </template> 
    <template v-slot:second>   // 可以简写成 #second
     这是YYY数据
    </template>
    </SonA>
    </div>
  </template>
  <script setup>
  import SonA from '../components/SonA.vue';
let data = ref([{ id: 1, name: 'aa', age: 18 }, { id: 2, name: 'bb', age: 10 }, { id: 3, name: 'cc', age: 20 }])
  </script>
```
```js 
// 子组件中
<template>

  <header>
    <div>头部</div>
    <slot name="first"></slot>
  </header>
  <section >
    <div>中间</div>
     <div v-for="item in data" :key="item.id">
     <slot :data="item"></slot>
     </div>
  </section>
  <footer>
      <div>底部</div>
      <slot name="second"></slot>
  </footer>
</template>
<script setup>
 let props = defineProps(['data'])
</script>
```
4. 动态插槽：通过数据切换插槽的名称
   语法：父组件中 <template #[string]></template>

### teloport 传送，把某些布局或内容传送到其他地方去。必须传送到它之前已渲染出来的元素。
```
<teleport to="body"><div>这是传送</div></teleport>
<teleport to=".class"><div>这是传送</div></teleport>
<teleport to="#id"><div>这是传送</div></teleport>

```

### 动态组件
如果要去除响应姓，可以用markRaw()包裹下。
```
<template>
  <ul><li v-for="(item,index) in tabList" :key="index" @click="changeTab(index)">item.name</li></ul>
  <keep-alive>
    <component :is="currentTabComponent"></component>
  </keep-alive>
</template>
<script steup>
import Home from '../components/Home.vue'
import A from '../components/A.vue'
import B from '../components/B.vue'
  let currentTab = ref('home')
  let tabList = reactive([{name:Home},{name:A},{name:B}])
  let currentTabComponent = computed(()=> {
    return 'tab-'+currentTab.toLowerCase()
  })
  const changeTab = (index)=> {
    currentTab.value = tabList[index].name
  }
</script>

```
### 异步加载
异步加载组件 可以将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块，减小代码量。
代码格式
```js
 import { defineAsyncComponent } from 'vue'
 const AsyncComp = defineAsyncComponent(()=> {
  import('../components/C.vue')
 })
```
```js
//  A.vue
<template>
  <div style="height:400px;background-color:red;">A组件</div>
</template>
```

```js
//  B.vue
<template>
  <div style="height:400px;background-color:green;">B组件</div>
</template>
```
```js
//  C.vue
<template>
  <div >C组件
  <img src="../vitedemo/src/assets/logo.png" style="width:300px;height: 300px;">
  </div>
</template>
```
```js
//  Home.vue
<template>
  <div>C组件
  <A></A>
  <B></B>
  <C></C>
  </div>
</template>
<script setup>
 import A from "../components/A.vue"
 import B from "../components/B.vue"
 // 直接引入组件
//  import C from "../components/C.vue"
 // 异步加载组件
 import { defineAsyncComponent } from 'vue'
 const AsyncComp = defineAsyncComponent(()=> {
  import('../components/C.vue')
 })
</script>
```


### 异步插件：为了提升性能 
#### useIntersectionObserver
1. 安装依赖 
```js
npm install @vueuse/core -S
```
2. 在组件中引入功能模块

```js
<template>
 <A>
 </A>
 <B></B>
 <C ref="target"  v-if="targetIsVisible"></C>
</template>
<script setup>
 import A from "../components/A.vue"
 import B from "../components/B.vue"
 import C from "../components/C.vue"

import { useIntersectionObserver} from '@vueuse/core'
const target = ref(null)
const targetIsVisible = ref(false)

const {stop} = useIntersectionObserver(target, ([{isIntersecting}],observerElement)=> {
  console.log(isIntersecting)  // 判断是否在屏幕中出现，如果组件即将在屏幕中出现，再加载组件
  if (isIntersecting) {
    targetIsVisible.value = isIntersecting
  }  
})
</script>
```
#### <suspense> 组件提供了另一个方案，允许将等待过程提升到组件树中处理，而不是在单个组件中。
一个常见的异步组件用例：
setup 语法糖，可以直接用asyc ，不用await
```js
// 子组件
<template>
  <div>
    A组件
    {{list}}
  </div>
</template>
<scirpt setup>
import axios from 'axios'
  let list = ref([])
  let res = await axios.get('https://v.api.aa1.cn/api/topbaidu/index.php')
  list.value = res.data.data.list
</scirpt>
```
```js 
//  父组件中
<template>
<Suspense>
<template #default>
 <A>
 </A>
</template>
<template #fallback>
<div>loading</div>
</template>
</Suspense>
<suspense> 组件有两个插槽。它们都只接收一个直接子节点。default 插槽里的节点会尽可能展示出来。如果不能，则展示 fallback 插槽里的节点。
 <B></B>
 <C ref="target"  v-if="targetIsVisible"></C>
</template>
<script setup>
 import A from "../components/A.vue"
 import B from "../components/B.vue"
 import C from "../components/C.vue"

import { useIntersectionObserver} from '@vueuse/core'
const target = ref(null)
const targetIsVisible = ref(false)

const {stop} = useIntersectionObserver(target, ([{isIntersecting}],observerElement)=> {
  console.log(isIntersecting)  // 判断是否在屏幕中出现，如果组件即将在屏幕中出现，再加载组件
  if (isIntersecting) {
    targetIsVisible.value = isIntersecting
  }  
})
</script>
```
 
 #### Mixin：混入。用来分发vue组件的可复用功能
 举例： A组件 B组件 C组件都可用的收藏功能
 创建mixin目录,新建mixin.js文件
 ```js
 // Mixin.js
import { ref } from 'vue'
export default function() {
 let num = ref(1)  // 点击量
 let favorites = ref(false)  // 是否收藏
 //  点击动作
 let  favoritesBtn = () => {
  if (favorites.value || num.value>0){ num.value--;  favorites.value = false} 
  else {
    favorites.value = true
    num.value++
  }

 }
  return {
    num,favorites,favoritesBtn
  }
}


```
 ```js
// A子组件
<template>
  <div>
    A组件
    {{list}}
    {{num}}<button @click="favoritesBtn">{{favorites?'已收藏':'收藏'}}收藏</button>
  </div>
</template>
<scirpt setup>
import Mixin from "../mixins/mixin.js"
console.log(Mixin())
let {num,favorites,favoritesBtn } = Mixin()
</scirpt>
```
 ```js
// A子组件
<template>
  <div>
    B组件
    {{list}}
    {{num}}<button @click="favoritesBtn">{{favorites?'已收藏':'收藏'}}收藏</button>
  </div>
</template>
<scirpt setup>
import Mixin from "../mixins/mixin.js"
console.log(Mixin())
let {num,favorites,favoritesBtn } = Mixin() //  混用数据不是自动共享的，A组件的数据和B组件的数据不是一样的。
```

 #### Mixin：混入。选项式api方式
 ```js
 // Mixin.js
 export const fav = {
  data() {
    return {
      num:1,
      favorites:false
    }
  },
  methods: {
    favBtn(params) {
      this.num +=params
      this.favorites = true
    }
  }
 }

```
 ```js
// A子组件
<template>
  <div>
    A组件
    {{list}}
    {{num}}<button @click="favBtn(1)">{{favorites?'已收藏':'收藏'}}收藏</button>
  </div>
</template>
<scirpt >
import { fav} from "../mixins/mixin.js"
export default {
  mixins: [fav]
  data() {
    return {
      str:'你好'
    }
  },
  methods: {

  }
}
</scirpt>
```

### Provide / Inject 依赖/注入

```js 
// home.vue 父组件
<template>
 <A></A>
</template>
<script setup>
import A  from '../components/A.vue'
let num = ref(100)
provide('changeNum',num)  // 提供数据
</script>
```
```js
// A.vue 组件
<template>
{{onum}}
</template>
<script setup>
const onum = inject('changeNum')  // 接受数据,是双向绑定的，所以数据也可以被修改
</script>
```

### vuex
```js 
 // store/index.js

 import { createStore} from 'vuex';

 export default createStore({
  state:{
    num:1,
    sum:10,
    str:'这是store的数据。'
  },
  getters:{
    total(state) {
      return state.sum+state.num
    }
  },
  mutations:{
    changeNum(state，value) {
      state.num = 100 + value
    }
  },
  actions:{
    changeBtn({commit,state},value) {
      alter('异步')
      commit('changeNum',value);    
    }
  },
  modules:{

  },
 })

```
组件内使用
```js
// A.vue 组件
<template>
{{onum}} ==> {{total}}<br>
{{knum}}
<button @click="changeNum">mutations修改num</button>
<button @click="changeBtn">actions修改num</button>
</template>
<script setup>
import {useStore } from 'vuex'
let store = useStore()
// let onum = store..state.num  // 1 不是响应式的。,需要computed返回
let   knum = computed(()=> {
  store.state.num
})
let total = store.getters.total   //  同样不是响应式，需要用computed返回
const changeNum = () => {
  store.commit('changeNum'，300)   // 点击按钮后，kmum会变化，但onum不会变化
}
const changeBtn = () => {
  store.dispatch('changeBtn'，300)   // 点击按钮后，kmum会变化，但onum不会变化
  
}
</script>
```
ps:commit=>mutations,用来触发同步操作的方法。
dispatch =>actions,用来触发异步操作的方法。
在store中注册了mutation和action，在组件中用dispatch调用action，然后action用commit调用mutation。

#### vuex命名空间 
默认情况下 模块内部的getters 、mutations、actions是注册在全局下的 可以通过store直接调用
为了保证内部模块的高封闭性 需要采取namespaced
给子模块设置 namespaced : true 就无法使用全局 直接调用了
```js
	new Vuex.Store({
		state:{},
		getters:{
			token: state => state.user.token,
		    name: state => state.setting.name
		],
		mutations:{},
		actions:{},
		modules: {
		    // 子模块
		    user: {
		      namespaced: true,
		      state: {
		        token: "12345"
		      },
		      mutations: {
		        update(state) {
		          state.token = '使用命名空间'
		        }
		      }
		    },
		    setting: {
		      namespaced: false,
		      state: {
		        name: "zwj"
		      },
		      mutations: {
		        updates(state) {
		          state.name = '不使用命名空间'
		        }
		      }
		    }
		  }
	})
// ===============================================================
    <button @click="updateToken">使用命名空间</button>
    <button @click="updateName">不使用命名空间</button>
	
	export default{
		methods:{
			 updateToken() {
		      this.$store.commit("update");
		    },
		    updateName() {
		      this.$store.commit("updates");
		    },
		}
	}
// user模块使用了命名空间 所以无法对下面的token属性进行修改
// setting模块没有使用命名空间 所以可以对下面的name属性进行修改
```
直接调用
带上模块的属性和路径
```js
	<button @click="updateToken">使用命名空间</button>
	
	export default{
		methods:{
			updateToken() {
		      this.$store.commit("user/update");
		    },
		}
	}
```
辅助函数
带上模块的属性和路径
```js
  <button @click="test">使用命名空间</button>

	import {mapMutations} from "vuex"
	export default{
		methods:{
		    // 辅助函数
		    ...mapMutations(['user/update']),
		    test(){
		    	// 执行上方的辅助函数 方便调用
				this['user/update']()
			}
		}
	}
```
createNamespacedHelpers
创建使用命名空间的模块的辅助函数
```js
	<button @click="update">使用命名空间</button>
	
	// 引入createNamespacedHelpers
	import { createNamespacedHelpers} from "vuex";
	const { mapMutations } = createNamespacedHelpers("user");
	export default{
			methods:{
				...mapMutations(["update"]),
			}
	}
```
#### vuex持久化存储
localStorage
持久化插件：vuex-persistedstate
```js 
npm i vuex-presistedstate -S
```
```js 
import persistedstate from 'vuex-presistedstate'

export default createStore({
  pl :[persistedstate({
    key:'per-vuex',   // 浏览器中的自定义键名
    paths:['user','module2' ]  //  需要存储起来的参数
  })]
})

```

### Pinia插件
#### 与vuex的区别
1. 没有mutations，只有state、getters、actions 
2.  pinia分模块不需要modules 
3.  pinia体积更小
  
#### pinia的使用
1. 安装需要 @next 因为 Pinia 2 处于 beta 阶段, Pinia 2 是对应 Vue3 的版本
```js 
# 使用 npm
npm install pinia@next
# 使用 yarn
yarn add pinia@next
```
2. 创建一个 pinia（根存储）并将其传递给应用程序：
```js
// main.js
import { createPinia } from 'pinia';

app.use(createPinia());
```
3. Store
Store 是一个保存状态和业务逻辑的实体，可以自由读取和写入，并通过导入后在 setup 中使用
创建一个 store
```js
// store.js
import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "myGlobalState",
  // state: 返回对象的函数
  state: ()=> ({
    count: 1,
    man:{
      name: 'zhangsan',
      age:18
    }
  }),
  getters:{},
  actinos:{}
});
 ```
使用 Store
```js
// xxx.vue
<template>
  <div>
    {{store.count}}
  </div>
</template>
<script>
  // 导入 Store， 使用自己的路径
  import { useStore } from "@/store/store.js";
  export default {
    setup() {
      // 调用函数 获得Store
      const store = useStore();
      return {
        store
      }
    }
  }
</script>
```
修改state数据
```
// XXX.vue
import { useStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
// const store = useStore();
const {count, man} = storeToRefs(useStore());
// 不能直接修改pinia数据， 可以用storeToRefs 修改
const changeName = () => {
  console.log(man.value)
 count.value = 'lisi'
 man.value.name = 'wangwu'
}
//  也可以用store.$patch批量修改, 但不能修改未定义的属性，不建议直接修改
const patch = ()=> {
  store.$patch(state=>{ 
  state.count++
    state.man.name = "zhangsansan",
    state.arr.push(1)  // 这个会报错，store内未定义
    console.log(state)
    })
}
```

5. getters 缓存计算
Pinia 中的 Getters 作用与 Vuex 中的 Getters 相同，但使用略有差异
Pinia 中的 Getters 直接在 Store 上读取，形似 Store.xx，就和一般的属性读取一样
Getter 第一个参数是 state，是当前的状态，也可以使用 this.xx 获取状态
Getter 中也可以访问其他的 Getter， 或者是其他的 Store
```
// 修改 store.js
import { defineStore } from "pinia";

import { useOtherStore } from "@/store/otherStore.js";  //  引用其他store

export const useStore = defineStore({
  id: "myGlobalState",
  state: ()=> ({
    count: 2
  }),
  getters: {
    // 一个基本的 Getter： 计算 count 的平方
    // 使用参数
    countPow2(state) {
      return state.count ** 2;
    },
    // 使用 this
    /* 
    countPow2() {
      return this.count ** 2;
    }, 
    */
    // 简单的 Getter 直接使用箭头函数
    // countPow2: state=> state.count ** 2

    // 获取其它 Getter， 直接通过 this
    countPow2Getter() {
      return this.countPow2;
    }

    // 使用其它 Store
    otherStoreCount(state) {
      // 这里是其他的 Store，调用获取 Store，就和在 setup 中一样
      const otherStore = useOtherStore();
      return otherStore.count;
    },
  }
});
```

```js
// otherStore.js
import { defineStore } from "pinia";

export const useOtherStore = defineStore({
  id: "otherState",
  state: ()=> ({
    count: 5
  }),
});
```
```js
// 子组件中
<template>
  A组件
  <hr>
  <h2>pinia</h2>
  --{{ count}} =={{man}} === {{ countPow2 }}

</template>
<script setup>

import { useStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
const store = useStore();
const {count, man, countPow2} = storeToRefs(useStore());

// 不能直接修改pinia数据， 可以用storeToRefs 修改
const changeName = () => {
  console.log(man.value)
  count.value = count.value + 1
 man.value.name = 'wangwu'
}
const patch = ()=> {
  store.$patch(state=>{
 
  state.count++
    state.man.name = "zhangsansan",
    state.arr.push(1)
    console.log(state)
    })
}
</script>
```
4. actions
Pinia 没有 Mutations，统一在 actions 中操作 state，通过this.xx 访问相应状态
虽然可以直接操作 Store，但还是推荐在 actions 中操作，保证状态不被意外改变
action 和普通的函数一样
action 同样可以像 Getter 一样访问其他的 Store，同上方式使用其它 Store
```js
// store.js
export const useStore({
  state: ()=> ({
    count: 2,
    // ...
  })
  // ...
  actions: {
    countPlusOne() {
      this.count++;
    },
    countPlus(num) {
      this.count += num;
    }
  }
})
```
```js
// 子组件中
<template>
  A组件
  <hr>
  <h2>pinia</h2>
  --{{ count}} =={{man}} === {{ countPow2 }}
  <button @click="changeName"> 修改名称</button>
  <button @click="patch"> 批量修改</button>
  <button @click="update"> actions修改</button>
</template>
<script setup>

import { useStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
const store = useStore();
const {count, man, countPow2} = storeToRefs(useStore());

// 不能直接修改pinia数据， 可以用storeToRefs 修改，但还是建议用actions修改
const changeName = () => {
  console.log(man.value)
  count.value = count.value + 1
 man.value.name = 'wangwu'
}
const patch = ()=> {
  store.$patch(state=>{ 
  state.count++
    state.man.name = "zhangsansan",
    state.arr.push(1)
    console.log(state)
    })
}
// 调用actions修改
const update=()=> {
  store.countPlus(10)
}
</script>
```
5. pinia的api
   patch()批量修改,$reste()重置数据,$subscribe()监听处理...

6.  模块引入对比 
```js 
// vuex模块划分
 import user from './modules/user'
 import menu from './modules/menu'
export default {
  modules: {
    user,
    menu,
  }
}
export default {
  state
}
```
 pinia可以以文件区分模块，也可直接导出
```js 
// user.js
import { defineStore } from "pinia";

import { useOtherStore } from "@/store/otherStore.js";  //  引用其他store

export const user = defineStore('user', {
  id:'firstUser'
  state:()=> {
    num:0
  }
  getters：{
      // 使用其它 Store
    otherStoreCount(state) {
      // 这里是其他的 Store，调用获取 Store，就和在 setup 中一样
      const otherStore = useOtherStore();
      return otherStore.count;
    },
  }
})

```
```js
// otherStore.js
import { defineStore } from "pinia";

export const useOtherStore = defineStore({
  id: "otherState",
  state: ()=> ({
    count: 5
  }),
});
```
```js
// XXX.vue
<scirpt setup>
import { user } from '../store/user'
import { useOtherStore } from '../store/user'
const userStore = user()
const useOtherStore = useOtherStore()
let { count } = storeToRefs(userStore) 
let { count: count1} = storeToRefs(useOtherStore)
</scirpt>

```
可以在组件中直接引用，也可以相互引用

7. pinia用插件实现持久化
   安装
```
 npm  install pinia-plugin-persist --save
```
引入
```js 
// main.js
import store from './store'
app.use(store)
```
```js
// store.js
import { createPinia } from "pinia";
// 引入持久化插件
import piniaPluginPersist from "pinia-plugin-persist";

const store = createPinia();
// 使用插件
store.use(piniaPluginPersist);
// 导出store
export default store;

import { defineStore } from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "myGlobalState",
  //开启数据缓存,默认sessionStorage,通过strategies配置项，可修改存储位置和key，通过paths配置项，配置 哪些参数需要持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: "my_user",
        storage: localStorage,
        paths:['count']
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
    sum:2
  }),
```

### vite 设置api代理,解决跨域问题
```
// vite.config.js 
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
  server: {
    proxy: {
      "/api": "https://testapi.tisuba.com",
    },
  },
});

```
### axios二次封装
```js 
//  utils/request.js
```
ps 以下学自 ConardLi 的 Vue3 script-setup 使用指南[https://cloud.tencent.com/developer/article/1944474#:~:text=%3Cscript%20setup%3E%20%E5%9D%97%E4%B8%AD%E7%9A%84%E8%84%9A%E6%9C%AC%E4%BC%9A%E8%A2%AB%E7%BC%96%E8%AF%91%E6%88%90%E7%BB%84%E4%BB%B6%E9%80%89%E9%A1%B9%20setup,%E5%87%BD%E6%95%B0%E7%9A%84%E5%86%85%E5%AE%B9%EF%BC%8C%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%E5%AE%83%E4%BC%9A%E5%9C%A8%E6%AF%8F%E6%AC%A1%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E8%A2%AB%E5%88%9B%E5%BB%BA%E7%9A%84%E6%97%B6%E5%80%99%E6%89%A7%E8%A1%8C%E3%80%82%20%E5%9C%A8%20%3Cscript%20setup%3E%20%E5%A3%B0%E6%98%8E%E7%9A%84%E9%A1%B6%E5%B1%82%E7%BB%91%E5%AE%9A%EF%BC%88%E5%8F%98%E9%87%8F%E3%80%81%E5%87%BD%E6%95%B0%E3%80%81import%E5%BC%95%E5%85%A5%E7%9A%84%E5%86%85%E5%AE%B9%EF%BC%89%EF%BC%8C%E9%83%BD%E4%BC%9A%E8%87%AA%E5%8A%A8%E6%9A%B4%E9%9C%B2%E7%BB%99%E6%A8%A1%E6%9D%BF%EF%BC%8C%E5%9C%A8%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8%E3%80%82]
和biliblili的Vite + Vue3 + Pinia + 项目 + TypeScript[https://www.bilibili.com/video/BV1aU4y1U7Gv]

### 与组件选项 setup 函数对比， <script setup> 的优点：

更少、更简洁的代码，不需要使用 return {} 暴露变量和方法了，使用组件时不需要主动注册了；
更好的 Typescript 支持，使用纯 Typescript 声明 props 和抛出事件，不会再像 option api 里那么蹩脚了；
更好的运行时性能；
当然， <script setup> 也是有自己的缺点的，需要学习额外的 API。

### 工具

Vue3 单文件组件 (SFC) 的 TS IDE 支持 <script setup lang="ts"> + VSCode + Volar。
类型检查使用 vue-tsc 命令。
VSCode：前端最好用的 IDE。
Volar：为 Vue3 的 \*.vue 单文件组件提供代码高亮、语法提示等功能支持的 VSCode 插件；Vue2 你可能是使用的 Vetur 插件，需要禁用 Vetur，下载 Volar，并启用它。
vue-tsc：类型检查和 dts 构建命令行工具。

### 基本用法

      将 setup 属性添加到 <script> 代码块上。

```js
        <script setup>
          import {ref} from 'vue'

          defineProps({
            msg: String
})

          const count = ref(0)

          function add() {
            count.value++
          }
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="add">count is: {{ count }}</button>
</template>
```

若需要使用 TypeScript，则将 lang 属性添加到 <script> 代码块上，并赋值 ts。

```js
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

function add() {
  count.value++
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="add">count is: {{ count }}</button>
</template>
```

<script setup> 块中的脚本会被编译成组件选项 setup 函数的内容，也就是说它会在每次组件实例被创建的时候执行。

在 <script setup> 声明的顶层绑定（变量、函数、import引入的内容），都会自动暴露给模板，在模板中直接使用（无需再一个个 return了），开发效率将大大的提高。
```js
              <script setup>
                import {ref} from 'vue'
                // 外部引入的方法，不需要通过 methods 选项来暴露它，模板可以直接使用
                import {getToken} from './utils'
                // 外部引入的组件，不需要通过 components 选项来暴露它，模板可以直接使用
                import ComponentA from '@/components/ComponentA'

                defineProps({
                  msg: String
})
                // 变量声明，模板可以直接使用
                const count = ref(0)
                // 函数声明，模板可以直接使用
                function add() {
                  count.value++
                }
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ getToken() }}</h1>
  <button type="button" @click="add">count is: {{ count }}</button>
  <ComponentA />
</template>
```
注意：

每个 _.vue 文件最多可同时包含一个 <script> 块 (不包括<script setup>)；
每个 _.vue 文件最多可同时包含一个 <script setup> 块 (不包括常规的 <script>)；

5、编译器宏
编译器宏（compiler macros） 有：defineProps、defineEmits、withDefaults、defineExpose 等。

编译器宏只能在 <script setup> 块中使用，不需要被导入，并且会在处理 <script setup> 块时被一同编译掉。

编译器宏必须在 <script setup> 的顶层使用，不可以在 <script setup> 的局部变量中引用。

5.1 defineProps
在 <script setup> 块中是没有组件配置项的，也就是说是没有 props 选项，需要使用 defineProps 来声明 props 相关信息。defineProps 接收的对象和组件选项 props 的值一样。

```js
<script setup>
const props = defineProps({
  msg: String,
  title: {
    type: String,
    default: '我是标题'
  },
  list: {
    type: Array,
    default: () => []
  }
})

// 在 js 中使用 props 中的属性
console.log(props.msg)
</script>

<template>
  <!-- 在模板中直接使用 props 中声明的变量 -->
  <h1>{{ msg }}</h1>
  <div>{{ title }}</div>
</template>
```

TS 版本：

```js
<script setup lang="ts">
interface ListItem {
  name: string
  age: number
}
const props = defineProps<{
  msg: string
  title: string
  list: ListItem[]
}>()

// 在 ts 中使用 props 中的属性，具有很好的类型推断能力
console.log(props.list[0].age)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{ title }}</div>
</template>
```

从代码中可以发现 TS 写法里 props 没有定义默认值。

Vue3 为我们提供了 withDefaults 这个编译器宏，给 props 提供默认值。

```js
<script setup lang="ts">
interface ListItem {
  name: string
  age: number
}
interface Props {
  msg: string
  // title可选
  title?: string
  list: ListItem[]
}
// withDefaults 的第二个参数便是默认参数设置，会被编译为运行时 props 的 default 选项
const props = withDefaults(defineProps<Props>(), {
  title: '我是标题',
  // 对于array、object需要使用函数，和以前的写法一样
  list: () => []
})
// 在 ts 中使用 props 中的属性，具有很好的类型推断能力
console.log(props.list[0].age)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{ title }}</div>
</template>
```

ps: 需要注意,在顶层声明一个和 props 的属性同名的变量，会有些问题。后一变量会覆盖前一变量。
5.2 defineEmits
一样的，在 <script setup> 块中也是没有组件配置项 emits 的，需要使用 defineEmits 编译器宏声明 emits 相关信息。

```js
// ./components/HelloWorld.vue
<script setup>
defineProps({
  msg: String,
})

const emits = defineEmits(['changeMsg'])

const handleChangeMsg = () => {
  emits('changeMsg', 'Hello TS')
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="handleChangeMsg">handleChangeMsg</button>
</template>
```

使用组件：

```js
<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const msg = ref('Hello Vue3')
const changeMsg = (v) => {
  msg.value = v
}
</script>

<template>
  <HelloWorld :msg="msg" @changeMsg="changeMsg" />
</template>
```

TS 版本：

```js
// ./components/HelloWorld.vue
<script setup lang="ts">

defineProps<{
  msg: string
}>()

const emits = defineEmits<{
  (e: 'changeMsg', value: string): void
}>()

const handleChangeMsg = () => {
  emits('changeMsg', 'Hello TS')
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="handleChangeMsg">handleChangeMsg</button>
</template>
```

使用组件：

```js
<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const msg = ref('Hello Vue3')
const changeMsg = (v: string) => {
  msg.value = v
}
</script>

<template>
  <HelloWorld :msg="msg" @changeMsg="changeMsg" />
</template>
```

5.3 defineExpose
在 Vue3 中，默认不会暴露任何在 <script setup> 中声明的绑定，即不能通过模板 ref 获取到组件实例声明的绑定。

Vue3 提供了 defineExpose 编译器宏，可以显式地暴露需要暴露的组件中声明的变量和方法。

```js
// ./components/HelloWorld.vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello Vue3')

const handleChangeMsg = (v) => {
  msg.value = v
}
// 对外暴露的属性
defineExpose({
  msg,
  handleChangeMsg,
})
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

                            使用组件：

```js
<script setup>
import { ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const root = ref(null)

onMounted(() => {
  console.log(root.value.msg)
})

const handleChangeMsg = () => {
  root.value.handleChangeMsg('Hello TS')
}
</script>

<template>
  <HelloWorld ref="root" />
  <button @click="handleChangeMsg">handleChangeMsg</button>
</template>
```
TS 版本：
子组件
```js
// ./components/HelloWorld.vue
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('Hello Vue3')

const handleChangeMsg = (v: string) => {
  msg.value = v
}

defineExpose({
  msg,
  handleChangeMsg
})
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```
使用组件：
```js 
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
// 此处暂时使用any，需要定义类型
const root = ref<any>(null)

onMounted(() => {
  console.log(root.value.msg)
})

const handleChangeMsg = () => {
  root.value.handleChangeMsg('Hello TS')
}
</script>

<template>
  <HelloWorld ref="root" />
  <button @click="handleChangeMsg">handleChangeMsg</button>
</template>
```

6、辅助函数
在 <script setup> 中常用的辅助函数hooks api，主要有：useAttrs、useSlots、useCssModule，其他的辅助函数还在实验阶段
6.1 useAttrs
在模板中使用attrs来访问attrs数据，与Vue2相比，Vue3的attrs 还包含了 class 和 style 属性。

在 <script setup> 中使用 useAttrs 函数获取 attrs 数据。
```js
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld class="hello-word" title="我是标题" />
</template>
```
```js
// ./components/HelloWorld.vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
// js中使用
console.log(attrs.class)  // hello-word
console.log(attrs.title)  // 我是标题
</script>

<template>
  <!-- 在模板中使用 $attrs 访问属性 -->
  <div>{{ $attrs.title }}</div>
</template>
```
6.2 useSlots
在模板中使用 $slots 来访问 slots 数据。

在 <script setup> 中使用 useSlots 函数获取 slots 插槽数据。
```js
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld>
    <div>默认插槽</div>
    <template v-slot:footer>
      <div>具名插槽footer</div>
    </template>
  </HelloWorld>
</template>
```
```js
<script setup>
import { useSlots } from 'vue'

const slots = useSlots()
// 在js中访问插槽默认插槽default、具名插槽footer
console.log(slots.default)
console.log(slots.footer)
</script>

<template>
  <div>
    <!-- 在模板中使用插槽 -->
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
```
6.3 useCssModule
在 Vue3 中，也是支持 CSS Modules 的，在 <style> 上增加 module 属性，即<style module> 。

<style module> 代码块会被编译为 CSS Modules 并且将生成的 CSS 类作为 
```js
<script setup lang="ts">
import { useCssModule } from 'vue'

// 不传递参数，获取<style module>代码块编译后的css类对象
const style = useCssModule()
console.log(style.success)  // 获取到的是success类名经过 hash 计算后的类名
    
// 传递参数content，获取<style module="content">代码块编译后的css类对象
const contentStyle = useCssModule('content')
</script>

<template>
  <div class="success">普通style red</div>

  <div :class="$style.success">默认CssModule pink</div>
  <div :class="style.success">默认CssModule pink</div>

  <div :class="contentStyle.success">具名CssModule blue</div>
  <div :class="content.success">具名CssModule blue</div>
</template>

<!-- 普通style -->
<style>
.success {
  color: red;
}
</style>

<!-- 无值的css module -->
<style module lang="less">
.success {
  color: pink;
}
</style>

<!-- 具名的css module -->
<style module="content" lang="less">
.success {
  color: blue;
}
</style>
```
ps:同名的CSS Module，后面的会覆盖前面的。
7、使用组件
在组件选项中，模板需要使用组件（除了全局组件），需要在 components 选项中注册。

而在 <script setup> 中组件不需要再注册，模板可以直接使用，其实就是相当于一个顶层变量。

建议使用大驼峰（PascalCase）命名组件和使用组件。
```js
<script setup>
import HelloWorld from './HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template>
```
8、组件name
<script setup> 是没有组件配置项 name 的，可以再使用一个普通的 <script> 来配置 name。
```js
// ./components/HelloWorld.vue
<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import { ref } from 'vue'
const total = ref(10)
</script>

<template>
  <div>{{ total }}</div>
</template>
```
```js
<script setup>
import HelloWorld from './components/HelloWorld.vue'
console.log(HelloWorld.name)  // 'HelloWorld'
</script>

<template>
  <HelloWorld />
</template>
```
ps:如果设置了 lang 属性，<script setup> 和 <script> 的 lang 需要保持一致。

9、inheritAttrs
inheritAttrs 表示是否禁用属性继承，默认值是 true。

<script setup> 是没有组件配置项 inheritAttrs 的，可以再使用一个普通的 <script>。
```js
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld title="我是title"/>
</template>
```

```js
// ./components/HelloWorld.vue
<script>
export default {
  name: 'HelloWorld',
  inheritAttrs: false,
}
</script>

<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>

<template>
  <div>
    <span :title="attrs.title">hover一下看title</span>
    <span :title="$attrs.title">hover一下看title</span>
  </div>
</template>
```

10、顶层await支持
<script setup> 中可以使用顶层 await。结果代码会被编译成 async setup()
```js
<script setup>
const userInfo = await fetch(`/api/post/getUserInfo`)
</script>
```
ps: async setup() 必须与 Suspense 组合使用，Suspense 目前还是处于实验阶段的特性，其 API 可能随时会发生变动，建议暂时不要使用。

11、命名空间组件
在 vue3 中，我们可以使用点语法来使用挂载在一个对象上的组件。
```js
// components/Form/index.js
import Form from './Form.vue'
import Input from './Input.vue'
import Label from './Label.vue'
// 把Input、Label组件挂载到 Form 组件上
Form.Input = Input
Form.Label = Label

export default Form
```
```js
// 使用：
<script setup lang="ts">
import Form from './components/Form'
</script>

<template>
  <Form>
    <Form.Label />
    <Form.Input />
  </Form>
</template>
```
命名空间组件在另外一种场景中的使用，从单个文件中导入多个组件时：
```js
// FormComponents/index.js
import Input from './Input.vue'
import Label from './Label.vue'

export default {
    Input,
    Label,
}
```
```js
// 使用
<script setup>
import * as Form from './FormComponents'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

12、状态驱动的动态css
Vue3 中 <style> 标签可以通过 v-bind 这一 CSS 函数将 CSS 的值关联到动态的组件状态上。
```js
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  // 使用顶层绑定
  color: v-bind('theme.color');
}
</style>
```

13、指令
全局指令：
```js
<template>
  <div v-click-outside />
</template>
```
自定义指令：
```js
<script setup>
import { ref } from 'vue'
const total = ref(10)

// 自定义指令
// 必须以 小写字母v开头的小驼峰 的格式来命名本地自定义指令
// 在模板中使用时，需要用中划线的格式表示，不可直接使用vMyDirective
const vMyDirective = {
  beforeMount: (el, binding, vnode) => {
    el.style.borderColor = 'red'
  },
  updated(el, binding, vnode) {
    if (el.value % 2 !== 0) {
      el.style.borderColor = 'blue'
    } else {
      el.style.borderColor = 'red'
    }
  },
}

const add = () => {
  total.value++
}
</script>

<template>
  <input :value="total" v-my-directive />
  <button @click="add">add+1</button>
</template>
```
单独导入的指令：
```js
<script setup>
// 导入的指令同样需要满足命名规范
import { directive as vClickOutside } from 'v-click-outside'
</script>

<template>
  <div v-click-outside />
</template>
```

14、Composition Api类型约束
```
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

type User = { 
  name: string
  age: number
}

// ref
const msg1 = ref('')  //  会默认约束成 string 类型，因为ts类型推导
const msg2 = ref<string>('')  //  可以通过范型约束类型
const user1 = ref<User>({ name: 'tang', age: 18 })  //  范型约束
const user2 = ref({} as User)  // 类型断言

// reactive
const obj = reactive({})
const user3 = reactive<User>({ name: 'tang', age: 18 })
const user4 = reactive({} as User)

// computed
const msg3 = computed(() => msg1.value)
const user5 = computed<User>(() => {
  return { name: 'tang', age: 18 }
})
</script>
```