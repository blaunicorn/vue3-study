<!-- src\views\PaySuccess.vue -->
<template>
  Home

  <button @click="goPayment">去支付</button>
</template>
<script setup lang="ts">
import axios from "axios";
import qs from "qs";
const goPayment = () => {
  let data = {
    orderId: "a1234566574348545443389111",
  };
  axios({
    url: "/api/payment",
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(data),
  }).then((res) => {
    console.log(res);
    if (res.data.code === 200) {
      window.location.href = res.data.result;
    }
  });
};
</script>
