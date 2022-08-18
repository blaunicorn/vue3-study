<template>
  Profile
  <hr />
  {{ id }}-{{ name }}
</template>
<script setup lang="ts">
import { onBeforeMount, toRefs } from "vue";

let props = defineProps({
  id: Number,
  name: String,
});
const { id, name } = toRefs(props);
onBeforeMount(() => {});
</script>
