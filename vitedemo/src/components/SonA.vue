// 子组件中
<template>
  A组件
  <hr>
  <h2>pinia</h2>
  --{{ count}} =={{man}} === {{ changeNum }}
  <button @click="changeName"> 修改名称</button>
  <button @click="patch"> 批量修改</button>
  <button @click="update"> actions修改</button>
  <header>
    <div>头部</div>
    <slot name="first"></slot>
  </header>
  <section>
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

import { useStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
const store = useStore();
const {count, man, changeNum} = storeToRefs(useStore());

let props = defineProps(['data'])
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
const update=()=> {
  store.countPlus(10)
}
</script>