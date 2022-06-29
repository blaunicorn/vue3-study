<template>
  <Header></Header>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </section>
  <!-- <div ref="target">
    <NewGoodCourse v-if="targetIsVisible"></NewGoodCourse>
  </div> -->
  <Foot></Foot>
</template>

<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useRoute } from "vue-router";
import Header from "../components/common/Header.vue";
import NavSwiper from "../components/home/NavSwiper.vue";
import Foot from "../components/common/Foot.vue";
const NewGoodCourse = defineAsyncComponent(() =>
  import("../components/home/NewGoodCourse.vue")
);
let route = useRoute();
let key = computed(() => {
  return route.path;
});
const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    targetIsVisible.value = isIntersecting;
  }
});
</script>
