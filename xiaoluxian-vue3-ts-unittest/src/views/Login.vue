<template>
  Login
  <hr />
  {{ id }}-{{ name }}
  <van-button type="primary" @click="loginHandler1">模拟登录</van-button>
  <hr />
  <div class="login">
    <div class="logo">
      <van-image
        round
        width="50%"
        height="50%"
        src="/images/logo.png"
      ></van-image>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          autocomplete="off"
          label-width="60px"
          v-model="state.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          autocomplete="new-password"
          v-model="state.password"
          label-width="60px"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px" class="submit-buttons">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { login } from "../api/news";

let props = defineProps({
  id: Number,
  name: String,
});
const { id, name } = toRefs(props);
const router = useRouter();
const state = reactive({
  username: "",
  password: "",
});
const loginHandler1 = () => {
  localStorage.setItem("testToken", "Bearer " + "eefed");
  router.push({ name: "Dashboard" });
};
const onSubmit = (values: any) => {
  console.log(state, values);
  login({
    username: "blackunicorn@163.com",
    password: "admin",
  }).then((res) => {
    localStorage.setItem("testToken", "Bearer " + res.data.token);
    localStorage.setItem("testUserInfo", JSON.stringify(res.data.userInfo));
    localStorage.setItem("id", JSON.stringify(res.data.userInfo.id));
    localStorage.setItem("username", JSON.stringify(res.data.userInfo.name));
    router.push({ name: "Home" });
  });
};
onBeforeMount(() => {});
</script>

<style scoped>
.login {
  height: 100vh;
  background-color: #fff;
}
.login .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.login .submit-buttons {
  margin: 20px 0;
}
.login .submit-buttons .no-border {
  border: none;
  color: #999;
}
.login .submit-buttons .van-button {
  margin-bottom: 8px;
}
</style>
