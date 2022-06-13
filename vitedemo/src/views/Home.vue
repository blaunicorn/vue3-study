<template>
<div>
  <router-link to="/about">关于我们</router-link>
  <button @click="go">关于我们</button>
</div>
home
</template>
<script setup>
import { useRouter } from 'vue-router';

let router = useRouter()
  let go =()=> {
    router.push('/about')
  }

  // vue2
  // methods:{
  //   go() {
  //     this.router.push('/about')
  //   }
  // }
</script>