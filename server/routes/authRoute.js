const express = require("express");
const {
  createUser,
  createUserInAdmin,
  login,
  logout,
  getallUser,
  getAllCustomer,
  getAllSalesperson,
  getaUser,
  deleteaUser,
  updateUser,
  updateUserProfile,
  blockUser,
  unblockUser,
  handleRefreshToken,
  updatePassword,
  changePassword,
  changeUserPassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getAllOrders,
  getOrderById,
  sendOTP,
  verifyOTP,
  clearOTP,
  deleteNotVerifiedUser,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/admin-create-user", createUserInAdmin);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.put("/password/:id", authMiddleware, isAdmin, changeUserPassword);
router.put("/order/update-order/:id", authMiddleware, updateOrderStatus);
router.put("/order/update-payment/:id", authMiddleware, updatePaymentStatus);

router.post("/send-otp", sendOTP);
router.post("/login", login);
router.post("/logout", logout);
router.post("/admin-login", loginAdmin);
router.post("/verify-otp", verifyOTP);
router.post("/clear-otp", clearOTP);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.post("/refresh", handleRefreshToken);
router.get("/getorder/:id", authMiddleware, isAdmin, getOrderById);

router.get("/all-users", getallUser);
router.get("/all-customer", getAllCustomer);
router.get("/all-salesperson", getAllSalesperson);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

router.get("/:id", authMiddleware, isAdmin, getaUser);

router.put("/edit-profile", authMiddleware, updateUserProfile);
router.put("/edit-user/:id", authMiddleware, isAdmin, updateUser);
router.put("/change-password", changePassword);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.delete("/delete-is-not-verified/:id", deleteNotVerifiedUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);

module.exports = router;
