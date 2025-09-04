const express = require("express");
const { payment, validatePayment } = require("../controller/paymentCtrl");
const router = express.Router();

router.post("/urlpayment", payment);
router.get("/validate", validatePayment);

module.exports = router;
