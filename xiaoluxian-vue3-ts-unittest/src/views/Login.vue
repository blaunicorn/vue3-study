<template>
  Login
  <hr />
  {{ id }}-{{ name }}
  <van-button type="primary" @click="loginHandler">模拟登录</van-button>
</template>
<script setup lang="ts">
import { onBeforeMount, toRefs } from "vue";
import { useRouter } from "vue-router";

let props = defineProps({
  id: Number,
  name: String,
});
const { id, name } = toRefs(props);
const router = useRouter();
const loginHandler = () => {
  localStorage.setItem("testToken", "Bearer " + "eefed");
  router.push({ name: "Dashboard" });
};
onBeforeMount(() => {});
</script>
