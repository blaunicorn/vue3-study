<!-- src\views\Login.vue -->
<template>
  <div class="container">
    <section>
      <div class="login-box">
        <!-- 登录框左侧 -->
        <div class="login-left">
          <a href="/" title="小" class="logo"
            ><img src="../assets/logo.png" alt="" srcset=""
          /></a>
          <div class="left-qrcode">
            <div id="qrcode">
              <canvas width="180" height="180" style="display: none"></canvas
              ><img src="" alt="" srcset="" style="display: block" />
            </div>
            <div class="qrcode-text">扫码登录</div>
          </div>
          <div class="quick-login">快捷登录</div>
          <div class="qq-wx-wb">
            <div class="wx-login">
              <a href="/oauth/login/WECHAT_OPEN" title="微信登录"
                ><i class="fa fa-weixin"></i
              ></a>
            </div>
            <div class="qq-login">
              <a href="/oauth/login/qq" title="QQ登录"
                ><i class="fa fa-qq"></i
              ></a>
            </div>
            <div class="wb-login">
              <a href="/oauth/login/weibo" title="微博登录"
                ><i class="fa fa-weibo"></i
              ></a>
            </div>
          </div>
        </div>
        <!-- 登录框右侧 -->
        <div class="login-right">
          <div class="login-form">
            <ul class="nav nav-tabs">
              <li
                class="nav-item"
                :class="loginType === item.id ? 'active' : ''"
                v-for="item in tabsLoginTxt"
                :key="item"
              >
                <a href="#" @click="loginChange(item.id)">{{ item.text }}</a>
              </li>
            </ul>
            <div class="tab-content">
              <!-- 账号登录 -->
              <div class="tab-pane fade show active" v-if="loginType === 1">
                <div class="tab-main">
                  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
                    <el-form-item class="login-user" prop="username">
                      <el-icon><avatar /></el-icon>
                      <el-input
                        v-model="ruleForm.username"
                        placeholder="请输入您的用户名"
                      />
                    </el-form-item>
                    <el-form-item class="login-password" prop="userpwd">
                      <el-icon><lock /></el-icon>
                      <el-input
                        type="password"
                        v-model="ruleForm.userpwd"
                        placeholder="请输入您的密码"
                      />
                    </el-form-item>
                    <el-form-item prop="status">
                      <slider-verify-two
                        @on-success="handleSuccess"
                        @on-failed="handleError"
                      ></slider-verify-two>
                    </el-form-item>
                    <el-form-item class="login-submit">
                      <el-button
                        type="primary"
                        @click="userLoginBtn(ruleFormRef)"
                        >登录</el-button
                      >
                    </el-form-item>

                    <a class="forgetpwd">忘记密码？</a>
                  </el-form>
                </div>
              </div>
              <!-- 短信登录 -->
              <div class="tab-main" v-else>
                <el-form
                  ref="ruleFormRefPhone"
                  :model="ruleFormPhone"
                  :rules="rulesPhone"
                >
                  <el-form-item class="login-user" prop="phone">
                    <el-icon><Iphone /></el-icon>
                    <el-input
                      v-model="ruleFormPhone.phone"
                      placeholder="请输入您的手机号"
                    />
                  </el-form-item>

                  <el-form-item class="login-Verification" prop="captcha">
                    <el-input
                      v-model="ruleFormPhone.captcha"
                      placeholder="请输入您的验证码"
                    />
                    <el-button
                      class="btn btn-primary sendcaptcha"
                      type="primary"
                      @click="sendcaptcha"
                      :disabled="timer > 0"
                      >发送验证码:{{ captcha }}</el-button
                    >
                  </el-form-item>

                  <div class="login-submit">
                    <el-button
                      class="btn btn-primary sendcaptcha"
                      type="primary"
                      @click="phoneBtn(ruleFormRefPhone)"
                      >登录</el-button
                    >
                  </div>
                  <el-button @click="dialogVisible = true"
                    >click to open the Dialog</el-button
                  >
                </el-form>
              </div>
              <div class="login-text">
                登录即同意相关服务条款和隐私政策
                <a href="/login">《小鹿线用户服务协议》</a
                ><a href="/login">《小鹿线隐私政策》</a>
                若您没有账号，系统将为您自动创建账号并登录。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <el-dialog
      v-model="dialogVisible"
      width="390px"
      append-to-body
      :show-close="false"
      :close-on-click-modal="false"
    >
      <slider-verify
        ref="dialogopen"
        :l="42"
        :r="10"
        :w="catcha.w"
        :h="catcha.h"
        :blocky="catcha.blocky"
        :imgurl="catcha.imgurl"
        :miniimgurl="catcha.miniimgurl"
        :slider-text="catcha.text"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
      ></slider-verify>
    </el-dialog>
  </div>
</template>
<script setup>
// 引入pinia
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";

// 加密
import { Encrypt } from "../utils/aes";
// api
import { loginByJson, sendCaptcha, loginByMobile } from "../api/index";
//字体图标
import { Avatar, Lock, Iphone } from "@element-plus/icons-vue";
import { ElMessage, ElDialog, ElButton } from "element-plus";
// 引入滑动插件
import SliderVerifyTwo from "@/components/common/SliderVerify2.vue";
import SliderVerify from "@/components/common/SliderVerify.vue";

import { useRouter } from "vue-router";
const router = useRouter();

//账号登录和短信登录切换
let loginType = ref(1);
//账号登录和短信登录
let tabsLoginTxt = ref([
  { id: 1, text: "账号登录" },
  { id: 2, text: "短信登录" },
]);
const loginChange = (id) => {
  loginType.value = id;
};
//账号密码登录
const ruleFormRef = ref("");
let ruleForm = reactive({
  username: "",
  userpwd: "",
  status: "",
});
const validatestatus = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请拖动滑块完成验证"));
  } else {
    callback();
  }
};
let rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 11, message: "请输入3-11位用户名", trigger: "blur" },
  ],
  userpwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 11, message: "请输入3-11位密码", trigger: "blur" },
  ],
  status: [{ validator: validatestatus, trigger: "change" }],
});
//  滑动框验证
const handleSuccess = (e) => {
  console.log(e, ruleForm);
  ruleForm.status = true;
  // ruleFormRef.validateField("status");
};
const handleError = () => {};

let dialogVisible = ref(false);
//账号密码点击登录
const userLoginBtn = (formElement) => {
  if (!formElement) return;
  formElement.validate((valid, fields) => {
    console.log(valid, fields);
    if (valid) {
      console.log("用户名和密码验证成功");
      // 测试账号密码 test/admin23
      const data = {
        username: Encrypt(ruleForm.username),
        password: Encrypt(ruleForm.userpwd),
      };
      loginByJson(data).then((res) => {
        console.log(res);
        if (res.meta.code != "10006") {
          ElMessage({
            showClose: true,
            message: res.meta.msg,
            type: "error",
          });
          return;
        }
        useUserStore().setToken(res.data.accessToken);
        console.log(useUserStore().token);
        // 提示登录成功
        ElMessage({
          showClose: true,
          message: res.meta.msg,
          type: "success",
        });
        router.go(-1);
      });
    } else {
      console.log("error submit!", fields, valid);
      ElMessage({
        showClose: false,
        message: "请检查用户名和密码",
        type: "error",
      });
    }
  });
};

// 短息登录
let captcha = ref("发送验证码");
let verify = ref();
let ruleFormRefPhone = ref("");
let ruleFormPhone = reactive({
  phone: "",
  captcha: "",
});

let rulesPhone = reactive({
  phone: [
    { reqiured: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3456789]\d{9}$/, message: "目前只支持中国大陆的手机号码" },
  ],
  captcha: [{ reqiured: true, message: "请输入验证码", trigger: "blur" }],
});

// 发送验证码
const sendcaptcha = () => {
  // 用户输入的手机号
  let phone = ruleFormPhone.phone;
  let regTel = /^1[3456789]\d{9}$/;
  if (!regTel.test(phone)) {
    ElMessage({
      showClose: true,
      message: "请输入正确的手机号",
      type: "warning",
    });
    return;
  }
  showVerify();
};
//显示滑块
const showVerify = () => {
  let regTel = /^1[3456789]\d{9}$/;
  let phone = ruleFormPhone.phone;
  if (regTel.test(phone)) {
    // 显示滑块
    // verify.value.show();
    // ，取消显示滑块，模拟显示滑对了，发送验证码
    onSuccess1();
  }
};
// 滑块滑对了，发送验证码
const onSuccess1 = () => {
  let phone = ruleFormPhone.phone;
  sendCaptcha({
    mobile: phone,
  }).then((res) => {
    if (res.meta.code == "200") {
      // 让验证码倒计时
      intercode();
    }
  });
};
let phoneTimer = null;
let { loginTimer: timer } = storeToRefs(useUserStore());
// 验证码倒计时
const intercode = () => {
  timer.value = 20;
  captcha.value = "重新发送10秒";
  if (phoneTimer != null) {
    clearInterval(phoneTimer);
  }
  phoneTimer = setInterval(() => {
    timer.value--;
    useUserStore().setLoginTimer(timer.value);
    if (timer <= 0) {
      clearInterval(phoneTimer);
      captcha.value = "重新发送";
      timer.value = 20;
    } else {
      captcha.value = `${timer.value}秒后重新发送`;
    }
  }, 1000);
};
//点击短信登录按钮
const phoneBtn = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log(valid);
      dialogVisible.value = true;
      const data = {
        mobile: Encrypt(ruleFormPhone.phone),
        captcha: ruleFormPhone.captcha,
      };
      loginByMobile(data).then((res) => {
        // console.log(res);
        // 登录成功
        if (res.meta.code != "10086") {
          ElMessage({
            showClose: true,
            message: res.meta.msg,
            type: "error",
          });
          return;
        }
        useUserStore().setToken(res.data.accessToken);
      });
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确格式",
        type: "warning",
      });
    }
  });
};

// 图片验证码传值
let catcha = reactive({
  catcha: {
    l: 42,
    r: 10,
    blocky: 0,
    imgurl: "",
    miniimgurl: "",
    text: "向右滑动完成拼图",
    h: 200,
    w: 350,
    sh: 45,
    sw: 55,
    modifyImg: "",
  },
});
// 点击登录
// handleLogin() {
//   // this.toLogin()
//   this.$refs.loginForm.validate(valid => {
//     if (valid) {
//       this.loading = true
//       checkLogins(this.loginForm.username)
//         .then(response => {
//           this.loading = false
//           if (response.data < 3) {
//             this.toLogin()
//           } else {
//             // 登陆错误超过三次
//             this.getImageVerifyCode()
//             setTimeout(() => {
//               this.dialogVisible = true
//             }, 500)
//           }
//         })
//         .catch(res => {
//           this.loading = false
//         })
//     } else {
//       console.log('error submit!!')
//       return false
//     }
//   })
// },
const onFail = () => {
  console.log("fail");
};
const onSuccess = (left) => {
  // this.loginForm.distance = left
  // // console.log('succss', left)
  // // 验证是否成功checkKaptchaImg是后台验证接口方法
  // checkKaptchaImg(left).then(res => {
  //   if (res.data) {
  //     this.$refs.dialogopen.handleSuccess()
  //     setTimeout(() => {
  //       this.dialogVisible = false
  //       this.imgurl = ''
  //       this.miniimgurl = ''
  //       this.loginForm.distance = left
  //       this.toLogin()
  //     }, 1000)
  //   } else {
  //     this.$refs.dialogopen.handleFail()
  //     setTimeout(() => {
  //       this.getImageVerifyCode()
  //     }, 500)
  //   }
  // }).catch(() => {})
};

// 刷新
const onRefresh = () => {
  // this.imgurl = ''
  // this.miniimgurl = ''
  // this.getImageVerifyCode()
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(../assets/img/loginbg.jpg) no-repeat center;
  background-size: cover;
}
section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 55, 255, 0.1);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 950px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  box-shadow: 0px 0px 5px #777;
}
.login-left {
  flex-shrink: 0;
  width: 475px;
  height: 500px;
  background-color: #388fff;
}
.login-right {
  min-width: 475px;
  height: 500px;
  background: url(../assets/img/ybbg.jpg) no-repeat center center;
  background-size: cover;
}
.nav-tabs {
  border-bottom: none;
  list-style: none;
}
/* 登录框左侧 */
.login-left {
  padding: 20px;
}
.login-left .logo img {
  width: 120px;
  height: 80px;
  object-fit: contain;
}
.left-qrcode {
  width: 200px;
  margin: 30px auto 0 auto;
}
.left-qrcode #qrcode {
  width: 200px;
  height: 200px;
  padding: 10px;
  background-color: #fff;
}
.left-qrcode #qrcode img {
  width: 100%;
  height: 100%;
}
.left-qrcode .qrcode-text {
  text-align: center;
  color: #fff;
  line-height: 35px;
  margin-top: 10px;
}
.quick-login {
  text-align: center;
  margin: 20px 0;
  color: #ddd;
}
.quick-login::before {
  content: "";
  width: 80px;
  height: 1px;
  background-color: #ddd;
  /* 这里用的inline-block ，也可以用relative 和 absoute实现 */
  display: inline-block;
  margin-bottom: 5px;
  margin-right: 10px;
}
.quick-login::after {
  content: "";
  width: 80px;
  height: 1px;
  background-color: #ddd;
  display: inline-block;
  margin-bottom: 5px;
  margin-left: 10px;
}
.qq-wx-wb {
  width: 180px;
  height: 55px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.qq-wx-wb .qq-login,
.qq-wx-wb .wx-login,
.qq-wx-wb .wb-login {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background-color: #e5ffe1;
  cursor: pointer;
}
.qq-wx-wb .qq-login a {
  color: #368afe;
}
.qq-wx-wb .wx-login a {
  color: #09bb07;
}
.qq-wx-wb .wb-login a {
  color: #d81e06;
}
/* 右侧登录表单开始 */
.login-right {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  /* flex: 0 0 350px; */
  width: 350px;
  height: 440px;
  padding: 10px 40px;
  background-color: #fff;
  box-shadow: 0 0 8px #ccc;
  border-radius: 8px;
}
.nav-tabs {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 0;
}
.nav-tabs li {
  padding: 0;
  width: 40%;
  font-size: 17px;
  font-weight: bold;
}
.nav-tabs li a {
  color: #333;
  display: block;
  height: 45px;
  line-height: 45px;
}
.nav-tabs .active {
  color: #388eff;
  border-bottom: 4px solid #388eff;
}
.tab-content .tab-pane.fade.show.active {
  color: #388eff;
}
.tab-main {
  height: 270px;
  padding: 1px 0 0 0;
}
.login-user,
.login-password,
.login-Verification {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #666;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-user i,
.login-password i {
  font-size: 18px;
  color: #666;
  margin-left: 5px;
}
.login-user input,
.login-password input {
  width: calc(100% - 30px);
  height: 35px;
  outline: none;
  color: #666;
  border: 0;
  padding: 0 5px;
}
.tab-main .el-input {
  margin-left: 5px;
  width: calc(100% - 35px);
  outline: none;
  border: 0;
}
.tab-main :deep(.el-input__inner),
.tab-main :deep(.el-input__wrapper) {
  outline: none;
  border: 0;
  box-shadow: none;
  background-color: #fff;
}
:deep(.el-form-item__error) {
  top: 120%;
}
.login-Verification .captcha {
  width: 130px;
  height: 35px;
  outline: none;
  color: #666;
  border: none;
}
.login-Verification .sendcaptcha {
  float: right;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 20px;
}
.tab-main :deep(.el-form-item__content) {
  flex-wrap: nowrap;
}
.login-submit {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-submit button {
  width: 100%;
  height: 35px;
  outline: none;
  border: none;
  letter-spacing: 5px;
  border-radius: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.forgetpwd {
  float: right;
  color: #888;
}
.login-text {
  width: 100%;
  margin-top: 5px;
  color: #666;
  text-align: left;
  text-indent: 2em;
}
</style>
