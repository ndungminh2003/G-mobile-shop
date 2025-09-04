const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    const otp = Math.floor(1000 + Math.random() * 9000);
    newUser.otp = otp;
    await newUser.save();
    const data = {
      to: email,
      text: `Hey User here is your OTP ${otp}`,
      subject: "Sent OTP",
      htm: "<h1>Hey User here is your OTP</h1>" + otp,
    };
    sendEmail(data);
    res.status(200).json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

const createUserInAdmin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  console.log(req.body);
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login a user
const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  console.log({ email, password, role });
  const findUser = await User.findOne({ email }).populate("wishlist").exec();
  if (!findUser) {
    return res.status(404).json("Email not found");
  }
  if (role !== findUser.role) {
    return res.status(404).json(`Not Authorised, Please login as ${role}`);
  }
  const validPassword = await findUser.isPasswordMatched(password);
  if (!validPassword) {
    return res.status(404).json("Password is not correct");
  }

  const refreshToken = generateRefreshToken(findUser?._id);
  const updateuser = await User.findByIdAndUpdate(
    findUser.id,
    {
      refreshToken: refreshToken,
    },
    { new: true }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // gán bằng true sau khi deploy
    sameSite: "strict",
    maxAge: 72 * 60 * 60 * 1000,
  });

  console.log({ refreshToken });

  res.json({
    _id: findUser?._id,
    name: findUser?.name,
    email: findUser?.email,
    mobile: findUser?.mobile,
    role: findUser?.role,
    accessToken: generateToken(findUser?._id),
    address: findUser?.address,
    dateOfBirth: findUser?.dateOfBirth,
    wishlist: findUser?.wishlist,
  });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    console.log({ refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      name: findAdmin?.name,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      role: findAdmin?.role,
      accessToken: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    return res.status(401).json("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user)
    return res
      .status(404)
      .json(" No Refresh token present in db or not matched");
  var newRefreshToken = user.refreshToken;
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      return res.status(403).json("Refresh Token is not valid");
    }

    const accessToken = generateToken(decoded?._id);
    newRefreshToken = generateRefreshToken(decoded?._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: false, // gán bằng true sau khi deploy
      sameSite: "strict",
      maxAge: 72 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken });
  });
  const updateUser = await User.findByIdAndUpdate(
    user.id,
    {
      refreshToken: newRefreshToken,
    },
    { new: true }
  );
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) return res.status(401).json("No Email Provided");
    const user = await User.findOne({ email });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: false,
        secure: false,
      });
      return res.sendStatus(204);
    }
    await User.findOneAndUpdate(
      { email },
      {
        refreshToken: "",
      }
    );
    res.clearCookie("refreshToken", {
      httpOnly: false,
      secure: false,
    });
    res.sendStatus(204);
  } catch (error) {
    throw new Error(error);
  }
});

// send OTP to email

const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log("controller", email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("Email not found");
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();
    const data = {
      to: email,
      text: `Hey User here is your OTP ${otp}`,
      subject: "Sent OTP",
      htm: "<h1>Hey User here is your OTP</h1>" + otp,
    };
    sendEmail(data);
    res.status(200).json({
      email: user.email,
      otp: user.otp,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// clear OTP

const clearOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("Email not found");
    }
    user.otp = "";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// verify OTP

const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  console.log("controller", email, otp);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }

    user.otp = ""; // Xoá mã OTP sau khi xác minh thành công
    await user.save();
    return res.status(200).json({ message: "OTP verification successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during OTP verification" });
  }
});

// delete not verified user

const deleteNotVerifiedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    if (user?.otp === "") {
      return res.status(400).json({ message: "Người dùng đã xác minh OTP." });
    }

    let deletedUser = await user.remove();

    return res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra trong quá trình xóa người dùng." });
  }
});

// Update a user

const updateUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        dateOfBirth: req?.body?.dateOfBirth,
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json({
      _id: updatedUser?._id,
      name: updatedUser?.name,
      email: updatedUser?.email,
      mobile: updatedUser?.mobile,
      role: updatedUser?.role,
      accessToken: updatedUser?.accessToken,
      address: updatedUser?.address,
      dateOfBirth: updatedUser?.dateOfBirth,
      wishlist: updatedUser?.wishlist,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  delete req.body.password;
  validateMongoDbId(id);
  try {
    let updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (password !== undefined) {
      updatedUser.password = password;
      const updatedPassword = await updatedUser.save();
      console.log({ updatedPassword });
    }
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCustomer = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find({ role: "user" }).populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllSalesperson = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find({ role: "salesperson" });
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json(getaUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const changeUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  validateMongoDbId(id);
  try {
    const user = await User.findById(id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json({ message: "Password Updated Successfully" });
    } else {
      res.json({ message: "Password not updated" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json({ message: "Password Updated Successfully" });
    } else {
      res.json({ message: "Password not updated" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email, role } = req.body;
  const user = await User.findOne({ email });
  console.log(role);
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/${role}/reset-password/?token=${token}'> Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let products = [];
    const user = await User.findById(_id);
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove;
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  // check coupon expiry
  const today = new Date();
  if (validCoupon.expiry < today) {
    throw new Error("Coupon Expired");
  }
  // const user = await User.findOne({ _id });
  // let { cartTotal } = await Cart.findOne({
  //   orderby: user._id,
  // }).populate("products.product");
  // let totalAfterDiscount = (
  //   cartTotal -
  //   (cartTotal * validCoupon.discount) / 100
  // ).toFixed(2);
  // await Cart.findOneAndUpdate(
  //   { orderby: user._id },
  //   { totalAfterDiscount },
  //   { new: true }
  // );
  res.json(validCoupon);
});
/*
const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "vnđ",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});
*/

const createOrder = asyncHandler(async (req, res) => {
  const { order, paymentMethod } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const products = order.products.map((product) => ({
      product: product._id,
      count: product.count,
      color: product.color,
      price: product.price,
      feature: product.feature,
    }));
    let newOrder = await new Order({
      products: products,
      paymentIntent: {
        id: uniqid(),
        method: paymentMethod,
        amount: order.totalAfterDiscount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "vnđ",
      },
      orderStatus: "Not Processed",
      email: order.email,
      name: order.name,
      phone: order.mobile,
      address: order.address,
      total: order.total,
      totalAfterDiscount: order.totalAfterDiscount,
      totalQuantity: order.totalQuantity,
    }).save();
    let user = await User.findByIdAndUpdate(
      _id,
      {
        $push: { orders: newOrder._id },
      },
      {
        new: true,
      }
    );

    let update = newOrder.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    const orderPopulate = await Order.findById(newOrder._id)
      .populate("products.product")
      .exec();
    res.json(orderPopulate);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product", "_id title price")
      .populate("orderby", "_id name email mobile address")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.findById(id)
      .populate("products.product", "_id title price")
      .populate("orderby", "_id name email mobile address")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { status, method } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        paymentIntent: {
          method: method,
          status: status,
        },
      },
      { new: true }
    )
      .populate("products.product")
      .exec();
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, method } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          method: method,
          status: status,
        },
      },
      { new: true }
    )
      .populate("products.product")
      .exec();
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteOrder = await Order.findByIdAndDelete(id);
    res.json({ message: "Delete Order Successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  createUserInAdmin,
  login,
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
  logout,
  updatePassword,
  changeUserPassword,
  changePassword,
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
  deleteOrder,
  getAllOrders,
  getOrderById,
  sendOTP,
  verifyOTP,
  clearOTP,
  deleteNotVerifiedUser,
};
