<template>detail-{{ id }}</template>
<script lang="ts" setup>
import { reactive, toRefs } from "vue";

const props = defineProps({
  id: String,
});
let { id } = toRefs(props);
const state = reactive({})
</script>
<style scoped></style>
