<template>
  <div>
    <router-link to="/about">关于我们</router-link>
    <button @click="go">关于我们</button>
    <hr>
    这是接收sonA传过来的值:{{msg}}
    <hr>
    <!-- <SonA @fn="forChild">
    这是XXX数据
      这是YYY数据</SonA> -->
    <SonA @fn="forChild">
      <template v-slot:first>
        这是XXX数据
      </template>
      <template v-slot:second>
        这是YYY数据
      </template>
    </SonA>
    <SonB :forChildBMsg="msg"></SonB>
    <div>

      <SonA @fn="forChild" :data="data">
        <template v-slot:first>
          这是XXX数据
        </template>
        <!-- 解构data -->
        <template v-slot="{data}">
          {{data.name}}=={{data.age}}
        </template>
        <template v-slot:second> // 可以简写成 #second
          这是YYY数据
        </template>
      </SonA>
    </div>
  </div>
  home
</template>
<script setup>

import { useRouter } from 'vue-router';
import SonA from '../components/SonA.vue';
import SonB from '../components/SonB.vue';
let data = ref([{ id: 1, name: 'aa', age: 18 }, { id: 2, name: 'bb', age: 10 }, { id: 3, name: 'cc', age: 20 }])
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