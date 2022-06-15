// 子组件中
<template>

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
let props = defineProps(['data'])
</script>