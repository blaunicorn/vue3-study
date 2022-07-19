<!-- https://www.cnblogs.com/gaozejie/p/14741385.html
登陆滑块验证。 -->
<template>
  <div class="slider-range" :class="rangeStatus ? 'success' : ''">
    <!-- <el-icon>
      <component
        @mousedown="rangeMove"
        :is="rangeStatus.value ? 'Select' : 'ArrowRightBold'"
      ></component>
    </el-icon> -->
    <el-icon @mousedown="rangeMove">
      <component v-if="rangeStatus" :is="Select"></component>
      <component v-else :is="ArrowRightBold"></component>
    </el-icon>

    <!--
      vue2
       <i
      @mousedown="rangeMove"
      :class="rangeStatus ? 'successIcon' : 'startIcon'"
    ></i> -->
  </div>
</template>
<script>
export default {
  name: "SliderVerify2",
};
</script>
<script setup>
import { Select, ArrowRightBold } from "@element-plus/icons-vue";
import { toRefs } from "vue";
const props = defineProps({
  //成功图标
  successIcon: {
    type: String,
    // default: "el-icon-success",
    // default: "el-icon-success",<el-icon><Check /></el-icon>
    default: "Select",
  },
  //成功文字
  successText: {
    type: String,
    default: "验证成功",
  },
  //开始的图标
  startIcon: {
    type: String,
    default: "ArrowRightBold",
    // default: "el-icon-d-arrow-right",
  },
  //开始的文字
  startText: {
    type: String,
    default: "拖动滑块到最右侧",
  },
});
const emit = defineEmits(["on-success", "on-failed"]);

let rangeStatus = ref(false);
console.log(rangeStatus);
let iconName = ref("");
iconName.value = "Select";
const rangeMove = (e) => {
  // console.log("点击", e, e.target, e.currentTarget, e.target.tagName);
  let ele = e.target;
  if (ele.tagName === "svg") {
    console.log(e.target.parentElement);
    ele = ele.parentElement;
  }

  let startX = e.clientX;
  let disX = 0; // 拖动距离
  let eleWidth = ele.offsetWidth;
  let parentWidth = ele.parentElement.offsetWidth;
  let MaxX = parentWidth - eleWidth;
  e.stopPropagation();
  // 没有触发拖动滑块
  if (rangeStatus.value) {
    return false;
  }
  // ele.style.transition = ".1s all";
  // ele.style.transform = `translateX(-50px) scale(1.1)`;
  // ele.style.left = "20px";
  // document.ondragstart = function (ev) {
  //   ev.preventDefault();
  // };
  // document.ondragend = function (ev) {
  //   ev.preventDefault();
  // };

  document.onmousemove = (e) => {
    console.log("鼠标移动");
    let endX = e.clientX;
    disX = endX - startX;
    if (disX <= 0) {
      disX = 0;
    }
    // 减去滑块的宽度，体验效果更好
    if (disX >= MaxX - eleWidth + 40) {
      disX = MaxX;
      rangeStatus.value = true;
      emit("on-success", rangeStatus.value);
    }
    ele.style.transition = ".1s all";
    ele.style.transform = `translateX(${disX}px)`;
    e.preventDefault();
  };
  document.onmouseup = (e) => {
    console.log("鼠标抬起");
    if (disX !== MaxX) {
      ele.style.transition = `.5s all`;
      ele.style.transform = `translateX(0)`;
      emit("on-failed", rangeStatus.value);
    } else {
      rangeStatus.value = true;
      emit("on-success", rangeStatus.value);
    }
    document.onmousemove = null;
    document.onmouseup = null;
  };
};
</script>
<style scopte>
.slider-range {
  background-color: #e3e4e6;
  width: 100%;
  position: relative;
  transition: 1s all;
  user-select: none;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
}
.slider-range i {
  position: absolute;
  left: 0;
  width: 60px; /*no*/
  height: 98%;
  color: #919191;
  background-color: #fff;
  border: 1px solid #bbb;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider-range.success {
  background-color: #7ac23c;
  color: #fff;
}
.slider-range.success i {
  color: #7ac23c;
}
</style>
