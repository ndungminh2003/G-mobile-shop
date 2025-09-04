const express = require("express");

const {
  createOrder,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} = require("../controller/orderCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.get("/get-order/:id", authMiddleware, getOrderById);
router.get("/get-user-order", authMiddleware, getOrderByUserId);
router.put("/update-order/:id", authMiddleware, isAdmin, updateOrder);
router.put("/update-payment/:id", authMiddleware, updatePaymentStatus);
router.put("/update-order-status/:id", authMiddleware, updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
