const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var colorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: {
      type: String,
      default: "#000000",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Color", colorSchema);
