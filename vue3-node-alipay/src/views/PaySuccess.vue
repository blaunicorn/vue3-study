<!-- src\views\PaySuccess.vue -->
<template>PaySuccess- 这是支付? 结果页</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { useRoute } from "vue-router";
import axios from "axios";
import qs from "qs";
let route = useRoute();
let isSuccess = ref(true);
onBeforeMount(() => {
  let data = {
    out_trade_no: route.query.out_trade_no,
    trade_no: route.query.trade_no,
  };
  axios({
    url: "/api/queryOrder",
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(data),
  }).then((res) => {
    console.log(res);
    isSuccess = res.data.data;
  });
});
</script>
