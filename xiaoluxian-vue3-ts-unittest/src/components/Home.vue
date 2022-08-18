<template>
  Home
  <VanButton type="primary" @click="goProfile">前往用户中心</VanButton>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

let router = useRouter();
const goProfile = () => {
  router.push({
    name: "Profile",
    // query: { id: 1, name: "andy", mail: "123@234.com" },
    params: { id: 1, name: "andy", mail: "123@234.com" },
  });
};
</script>
