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
  emitter.on('fn', e => {
    console.log(e)
    s.value = e.value
  })
})
</script>