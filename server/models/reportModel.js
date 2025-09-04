const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var reportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
    },
    noOrders: {
      type: Number,
      required: true,
    },
    totalRevenue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Report", reportSchema);
