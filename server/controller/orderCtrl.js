const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

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

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userOrders = await User.findById(_id)
      .select("_id orders")
      .populate({
        path: "orders",
        select:
          "_id paymentIntent orderStatus total totalAfterDiscount products createdAt",
        populate: {
          path: "products.product",
          select: "_id title thumbnail",
        },
      })
      .exec();
    res.json(userOrders.orders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product", "_id title thumbnail slug quantity")
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
    const order = await Order.findById(id)
      .populate("products.product", "_id title thumbnail slug quantity")
      .exec();
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

// const getOrderByUserId = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     const userorders = await Order.findOne({ orderby: _id })
//       .populate("products.product", "_id title price")
//       .populate("orderby", "_id name email mobile address")
//       .exec();
//     res.json(userorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const getAllOrders = asyncHandler(async (req, res) => {
//   try {
//     const alluserorders = await Order.find()
//       .populate("products.product")
//       .exec();
//     res.json(alluserorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const getOrderById = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const userorders = await Order.findById(id)
//       .populate("products.product", "_id title price")
//       .populate("orderby", "_id name email mobile address")
//       .exec();
//     res.json(userorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

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

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedOrder);
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
  createOrder,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
};
