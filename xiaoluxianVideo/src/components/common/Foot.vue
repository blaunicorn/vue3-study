<template>
  <footer>
    <div class="footer-main">
      <div class="footer-xlx">
        <img src="../../assets/img/logo.jpg" alt="" />
      </div>
      <div class="footer-factory">
        <img src="../../assets/logo.png" alt="" srcset="" />g
      </div>
      <div class="copyright">
        <ul class="copy-top">
          <li>关于我们</li>
          <li>|</li>
          <li>联系我们</li>
          <li>|</li>
          <li>意见反馈</li>
          <li>|</li>
          <li>版权声明</li>
        </ul>
        <div class="copy-bottom">
          <span>{{ copyright }}Copyright 2021 www.tisuba.com 黑备</span>
          <a
            data-v-d94f43e2=""
            href="https://beian.miit.gov.cn/"
            target="_blank"
            class="go"
            >黑备{{ icp }}</a
          >
          <p class="copy-user">
            <a href="">《用户服务协议》</a>
            <a href="">《隐私政策》</a>
          </p>
        </div>
      </div>
      <div class="wx">
        <div class="wx-bg">
          <img src="../../assets/img/logo.jpg" alt="" srcset="" />
        </div>
        <div class="wx-dsc">官方微信</div>
      </div>
      <div class="wx">
        <div class="wx-bg">
          <img src="../../assets/img/logo.jpg" />
        </div>
        <div class="wx-dsc">咨询老师微信</div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { getSetting } from "../../api/index";
let copyright = ref("");
let icp = ref("");
onBeforeMount(() => {
  getSetting().then((res) => {
    copyright.value = res.data.data.copyright;
    icp.value = res.data.data.icp;
  });
});
</script>
<style scoped>
footer {
  width: 100%;
  min-width: 1200px;
  height: 150px;
  background-color: #3483ff;
  opacity: 1;
  border-radius: 0px;
}
.footer-main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1200px;
  height: 100%;
  color: #ffffff;
  margin: auto;
}
.footer-xlx {
  width: 110px;
  height: 150px;
  opacity: 1;
}
.footer-xlx img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.footer-factory {
  width: 130px;
  height: 150px;
  margin: 0 20px;
}
.footer-factory img {
  width: 100%;
  height: 100%;
}
.copyright {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.copy-top {
  display: flex;
  font-size: 14px;
  margin: 0 10px 10px 50px;
}
.copy-top li {
  list-style-type: none;
  margin: 0 10px;
  color: #ffffff;
}
.copy-bottom {
  font-size: 12px;
}
.copy-bottom a {
  color: #ffffff;
  text-decoration: underline;
  padding-left: 10px;
}
.wx {
  margin-left: 20px;
  width: 80px;
  height: 100px;
  font-size: 12px;
}
.wx img {
  width: 100%;
  height: 100%;
}
.wx-dsc {
  padding-top: 5px;
  text-align: center;
}
.copy-user {
  margin-top: 10px;
  text-align: center;
}
.copy-user a {
  text-decoration: none;
  color: #ffffff;
}
</style>
