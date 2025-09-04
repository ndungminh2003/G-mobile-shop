const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        feature: String,
        price: Number,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Delivering",
        "Cancelled",
        "Delivered",
      ],
    },
    // orderby: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    // },
    email: String,
    name: String,
    phone: String,
    address: String,
    total: Number,
    totalAfterDiscount: Number,
    totalQuantity: Number,
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
