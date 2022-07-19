<template>
  <div
    class="slide-verify"
    id="slide-verify"
    :style="data.widthLable"
    onSelectstart="return false;"
  >
    <canvas
      ref="canvas"
      class="silde-verify-canvas"
      :width="w"
      :height="h"
    ></canvas>
    <canvas
      ref="block"
      class="slide-verify-block"
      :width="w"
      :height="h"
    ></canvas>
    <div
      class="slide-verify-refresh-icon el-icon-refresh"
      @click="refresh"
    ></div>
    <div
      class="slide-verify-info"
      :class="{ fail: data.fail, show: data.showInfo }"
      @click="refresh"
    >
      {{ data.infoText }}
    </div>
    <div
      class="slide-verify-slider"
      :style="data.widthLable"
      :class="{
        'container-active': data.containerActive,
        'container-success': data.containerSuccess,
        'container-fail': data.containerFail,
      }"
    >
      <div
        class="slide-verify-slider-mask"
        :style="{ width: data.sliderMaskWidth }"
      >
        <!-- slider -->
        <div
          class="slide-verify-slider-mask-item"
          :style="{ left: data.sliderLeft }"
          @mousedown="sliderDown"
          @touchstart="touchStartEvent"
          @touchmove="touchMoveEvent"
          @touchend="touchEndEvent"
        >
          <div
            class="slide-verify-slider-mask-item-icon el-icon-s-unfold"
          ></div>
        </div>
      </div>
      <span class="slide-verify-slider-text">{{ data.sliderText }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "SliderVerify",
};
</script>
<script setup>
import { DataAnalysis } from "@element-plus/icons-vue";
import { onBeforeMount, onMounted, toRefs } from "vue";
const emit = defineEmits(["success", "failed", "refresh"]);
const PI = Math.PI;

function sum(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}
const props = defineProps({
  // block length
  l: {
    type: Number,
    default: 42,
  },
  // block radius
  r: {
    type: Number,
    default: 10,
  },
  // canvas width 背景图宽
  w: {
    type: Number,
    default: 310,
  },
  // canvas height 背景图高
  h: {
    type: Number,
    default: 155,
  },
  // canvas width
  sw: {
    // 小图宽
    type: [Number, String],
    default: 50,
  },
  // canvas height
  sh: {
    type: [Number, String],
    default: 50,
  },
  block_x: {
    type: Number,
    default: 155,
  },
  // 小图初始的垂直距离
  block_y: {
    type: Number,
    default: 20,
  },
  sliderText: {
    type: String,
    default: "Slide filled right",
  },
  // 大图地址
  imgurl: {
    type: String,
    default: "",
  },
  // 小图地址
  miniimgurl: {
    type: String,
    default: "",
  },
  fresh: {
    type: Boolean,
    default: false,
  },
});
let canvas = ref(null);
let block = ref(null);
let data = reactive({
  containerActive: false, // container active class
  containerSuccess: false, // container success class
  containerFail: false, // container fail class
  canvasCtx: null,
  blockCtx: null,
  block: null,
  canvasStr: null,
  block_x: "", // container random position
  block_y: "",
  // block real lenght
  L: props.l + props.r * 2 + 3,
  img: "",
  originX: "",
  originY: "",
  isMouseDown: false,
  trail: [],
  widthlable: "",
  sliderLeft: 0, // block right offset
  sliderMaskWidth: 0, // mask width
  dialogVisible: false,
  infoText: "验证成功",
  fail: false,
  showInfo: false,
});

// 刷新
const refresh = () => {
  emit("refresh");
};

watch(
  () => props.fresh,
  (newValue, oldValue) => {
    if (newValue) {
      init();
    }
  }
);
onMounted(() => {
  init();
});
const init = () => {
  initDom();
  bindEvents();
  data.widthlable = `width:${props.w}px`;
};
const initDom = () => {
  data.block = block.value;
  data.canvasStr = canvas.value;
  // console.log(block);
  data.canvasCtx = data.canvasStr.getContext("2d");
  data.blockCtx = data.block.getContext("2d");
  initImg();
};
const initImg = () => {
  const img = document.createElement("img");
  const img1 = document.createElement("img");
  img.src = data.imgurl;
  img.onload = function () {
    data.canvasCtx.drawImage(img, 0, 0, props.w, props.h);
  };
  img.onerror = () => {
    img.src = data.imgurl;
  };
  data.img = img;
  if (!props.blocky) {
    return;
  }
  img1.onerror = () => {
    img1.src = data.miniimgurl;
  };
  img1.src = data.miniimgurl;
  img1.onload = function () {
    // data.blockCtx.drawImage(img1, 0, props.blocky, props.sw, props.sh)
    data.blockCtx.drawImage(img1, 0, props.blocky, 55, 45);
  };
};
const bindEvents = () => {
  document.addEventListener("mousemove", (e) => {
    if (!data.isMouseDown) return false;
    const moveX = e.clientX - data.originX;
    const moveY = e.clientY - data.originY;
    if (moveX < 0 || moveX + 38 >= props.w) return false;
    data.sliderLeft = moveX + "px";
    const blockLeft = ((props.w - 40 - 20) / (props.w - 40)) * moveX;
    data.block.style.left = blockLeft + "px";
    data.containerActive = true; // add active
    data.sliderMaskWidth = moveX + "px";
    data.trail.push(moveY);
  });
  document.addEventListener("mouseup", (e) => {
    if (!data.isMouseDown) return false;
    data.isMouseDown = false;
    if (e.clientX === data.originX) return false;
    data.containerActive = false; // remove active
    verify();
  });
};
const verify = () => {
  const arr = data.trail; // drag y move distance
  const average = arr.reduce(sum) / arr.length; // average
  const deviations = arr.map((x) => x - average); // deviation array
  const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // standard deviation
  const left = parseInt(data.block.style.left);
  emit("success", left, stddev);
};
const reset = (h) => {
  data.containerActive = false;
  data.containerSuccess = false;
  data.containerFail = false;
  data.sliderLeft = 0;
  data.block.style.left = 0;
  data.sliderMaskWidth = 0;
  data.canvasCtx.clearRect(0, 0, props.w, props.h);
  data.blockCtx.clearRect(0, 0, props.w, props.h);
  data.fail = false;
  data.showInfo = false;
  data.containerFail = false;
  data.containerSuccess = false;
  data.initImg(h);
};
const handleFail = () => {
  data.fail = true;
  data.showInfo = true;
  data.infoText = "验证失败";
  data.containerFail = true;
  // setTimeout(() => {
  //   data.block.style.left = 0
  //   data.sliderMaskWidth = 0
  //   data.sliderLeft = 0
  //   data.fail = false
  //   data.showInfo = false
  //   data.containerFail = false
  // }, 800)
};
const handleSuccess = () => {
  data.showInfo = true;
  data.infoText = "验证成功";
  data.containerSuccess = true;
  setTimeout(() => {
    data.block.style.left = 0;
    data.sliderMaskWidth = 0;
    data.sliderLeft = 0;
    data.fail = false;
    data.showInfo = false;
    data.containerSuccess = false;
  }, 1000);
};
const sliderDown = (event) => {
  data.originX = event.clientX;
  data.originY = event.clientY;
  data.isMouseDown = true;
};
const touchStartEvent = (e) => {
  data.originX = e.changedTouches[0].pageX;
  data.originY = e.changedTouches[0].pageY;
  data.isMouseDown = true;
};
const touchMoveEvent = (e) => {
  if (!data.isMouseDown) return false;
  const moveX = e.changedTouches[0].pageX - data.originX;
  const moveY = e.changedTouches[0].pageY - data.originY;
  if (moveX < 0 || moveX + 38 >= props.w) return false;
  data.sliderLeft = moveX + "px";
  const blockLeft = ((props.w - 40 - 20) / (props.w - 40)) * moveX;
  props.block.style.left = blockLeft + "px";

  props.containerActive = true;
  props.sliderMaskWidth = moveX + "px";
  props.trail.push(moveY);
};
const touchEndEvent = (e) => {
  if (!data.isMouseDown) return false;
  data.isMouseDown = false;
  if (e.changedTouches[0].pageX === this.originX) return false;
  data.containerActive = false;
  verify();
};
</script>
<style scoped>
.slide-verify {
  position: relative;
  width: 310px;
  /* overflow: hidden; */
}
.slide-verify-block {
  position: absolute;
  left: 0;
  top: 0;
}
.slide-verify-refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  content: "刷新";
  font-size: 22px;
  line-height: 34px;
  text-align: center;
  font-weight: bold;
  color: #3fdeae;
  background: url(../../assets/img/refresh.png);
  background-size: cover;
  /* background-size: 34px 34px; */
}
.slide-verify-refresh-icon:hover {
  transform: rotate(180deg);
  transition: all 0.2s ease-in-out;
}
.slide-verify-info {
  position: absolute;
  top: 170px;
  left: 0;
  height: 30px;
  width: 310px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  background-color: #52ccba;
  /* opacity: 1; */
  opacity: 0;
}
.slide-verify-info.fail {
  background-color: #f57a7a;
}
.slide-verify-info.show {
  animation: hide 1s ease;
}
@keyframes hide {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
}

.slide-verify-slider {
  position: relative;
  text-align: center;
  width: 310px;
  line-height: 40px;
  height: 40px;
  margin-top: 15px;
  background-color: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}
.slide-verify-slider-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 1px solid #1991fa;
  background-color: #d1e9f3;
}

.slide-verify-slider-mask-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 38px;
  height: 38px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
}

.slide-verify-slider-mask-item:hover {
  background: #1991fa;
}
.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
  /* background-position: 0 -13px; */
}
.slide-verify-slider-mask-item-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
  content: "法币";
  font-size: 22px;
  color: #ddd;
  text-align: center;
  line-height: 12px;
  background: url("../../assets/img/double-right.png");
  background-size: 20px 20px;
}
.container-active .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.container-active .slide-verify-slider-mask {
  height: 38px;
  border-width: 1px;
}

.container-success .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.container-success .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.container-success .slide-verify-slider-mask-item-icon {
  background-position: 0 0 !important;
}

.container-fail .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.container-fail .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.container-fail .slide-verify-slider-mask-item-icon {
  top: 14px;
  /* background-position: 0 -82px !important; */
}

.container-active .slide-verify-slider-text,
.container-success .slide-verify-slider-text,
.container-fail .slide-verify-slider-text {
  display: none;
}
</style>
