var express = require("express");
var router = express.Router();

// 引入支付宝支付的配置和formdata格式文件
const alipaySdk = require("../db/alipayUtil");
const AlipayFormData = require("alipay-sdk/lib/form").default;
// 配置跨域
const cors = require("cors");
router.use(cors());
router.use(express.urlencoded({ extended: true }));
const axios = require("axios");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/queryOrder", function (req, res, next) {
  let out_trade_no = req.body.out_trade_no;

  let trade_no = req.body.trade_no;

  //对接支付宝
  const formData = new AlipayFormData();
  formData.setMethod("get");
  formData.addField("bizContent", {
    out_trade_no,
    trade_no,
  });

  const result = alipaySdk.exec(
    "alipay.trade.query",
    {},
    { formData: formData }
  );

  result.then((resData) => {
    axios({
      url: resData,
      method: "get",
    })
      .then((data) => {
        let r = data.data.alipay_trade_query_response;
        if (r.code === "10000") {
          console.log(r);
          switch (r.trade_status) {
            case "WAIT_BUYER_PAY":
              res.send({
                success: true,
                code: 200,
                msg: "支付宝有交易记录，没付款",
              });
              break;

            case "TRADE_FINISHED":
              res.send({
                success: true,
                code: 200,
                msg: "支付成功，不可以退款",
              });
              break;

            case "TRADE_SUCCESS":
              res.send({
                success: true,
                code: 200,
                msg: "支付成功",
              });
              break;

            case "TRADE_CLOSED":
              res.send({
                success: true,
                code: 200,
                msg: "交易关闭",
              });
              break;
          }
        } else if (r.code === "40004") {
          res.json("交易不存在");
        }
      })
      .catch((err) => {
        res.json({
          msg: "查询失败",
          err,
        });
      });
  });
});

router.post("/api/payment", function (req, res, next) {
  //前端给后端的数据
  let orderId = req.body.orderId;
  //对接支付宝
  const formData = new AlipayFormData();
  //  调用setMethod并传入  get，会返回支付后的页面的url
  formData.setMethod("get");

  formData.addField("returnUrl", "http://localhost:8080/pay-success");
  formData.addField("bizContent", {
    outTradeNo: orderId,
    productCode: "FAST_INSTANT_TRADE_PAY",
    totalAmount: "0.01",
    subject: "商品",
    body: "商品详情",
  });

  const result = alipaySdk.exec(
    "alipay.trade.page.pay",
    {},
    { formData: formData }
  );
  // 后端给前段返回  支付宝返回的的链接
  result.then((resp) => {
    res.send({
      success: "true",
      code: 200,
      result: resp,
    });
  });
});

module.exports = router;
