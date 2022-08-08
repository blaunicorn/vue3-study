// src\store\cart.js
import { defineStore } from "pinia";
export const useCartStore = defineStore({
  id: "cart",
  state: () => {
    return {
      cartList: [], //购物车数据
      select: [], //选中的商品的id
      orderList: [], // 结算订单
    };
  },
  getters: {
    checkAll() {
      // 判断是否全选，返回 true和false
      return this.cartList.length == this.select.length;
    },
    total() {
      this.orderList = [];
      let total = {
        price: 0,
        number: 0,
      };
      this.cartList.forEach((element) => {
        if (this.select.indexOf(element.id) != -1) {
          this.orderList.push({
            id: element.courseId,
            number: 1,
          });
          total.price += element.discountPrice * element.counter;
          total.number = this.select.length;
        }
      });
      return total;
    },
  },
  actions: {
    //获取数据
    getCartList(list) {
      this.select = [];
      list.forEach((item) => {
        item["check"] = true;
        this.select.push(item.id);
      });
      this.cartList = list;
      console.log(this.cartList.length == this.select.length);
    },
    //全选
    all() {
      this.select = this.cartList.map((item) => {
        item["check"] = true;
        return item.id;
      });
    },
    //全不选
    unAll() {
      this.cartList.forEach((item) => {
        item["check"] = false;
      });
      this.select = [];
    },
    //单选,根据索引值查找id
    checkItem(index) {
      let id = this.cartList[index].id;
      let idx = this.select.indexOf(id);
      console.log(id, idx);
      if (idx > -1) {
        // select中有，则移除掉，
        this.cartList[index].check = false;
        this.select.splice(idx, 1);
      } else {
        this.cartList[index].check = true;
        this.select.push(id);
      }
    },
  },
});
