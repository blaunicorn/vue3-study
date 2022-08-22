<template>
  Profile
  <!-- <hr />
  {{ id }}-{{ name }} -->
  <div class="profile">
    <van-cell-group>
      <van-cell title="姓名" :value="state.userInfo.name" />
      <van-cell title="邮箱" :value="state.userInfo.email" label="描述信息" />
    </van-cell-group>
    <van-button round block type="primary" @click="logout">退出</van-button>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

let props = defineProps({
  id: Number,
  name: String,
});
const state = reactive({
  userInfo: {},
});
const { id, name } = toRefs(props);
const router = useRouter();
const logout = () => {
  localStorage.clear();
  router.push("/");
};
onBeforeMount(() => {
  state.userInfo = JSON.parse(localStorage.getItem("testUserInfo"));
});
</script>
<style scoped>
.profile {
  margin: 5px;
}
</style>
