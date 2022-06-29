// src\mixins\courseType.js
import { ref } from "vue";
export default function () {
  let num = ref(1);
  let fav = ref(false);
  let courseTypeFn = (type) => {
    let value = "";
    let obj = { 1: "初级", 2: "中级", 3: "高级" };
    value = obj[type] ? obj[type] : type;
    return value;
  };

  return {
    num,
    fav,
    courseTypeFn,
  };
}
