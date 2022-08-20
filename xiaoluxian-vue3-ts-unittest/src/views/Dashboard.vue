<template>
  Dashboard
  <van-button type="primary" @click="LoginOUtHandler">退出</van-button>
  <hr />
  <div style="display: flex">
    <ul class="fl">
      <li>
        <router-link to="/dashboard/admin/list">管理员列表</router-link>
      </li>
      <li>
        <router-link to="/dashboard/role/list">角色管理</router-link>
      </li>
      <li>
        <router-link to="/dashboard/cate/list">分类管理</router-link>
      </li>
    </ul>
    <div class="fr">
      <router-view></router-view>
    </div>
  </div>
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
const LoginOUtHandler = () => {
  localStorage.removeItem("testToken");
  window.location.reload();
};
onBeforeMount(() => {});
</script>
<style scoped>
.fl {
  flex: 0 1 200px;
  border-right: 1px solid rgb(133, 126, 126);
}
.fr {
  flex: 1 1 auto;
}
</style>
