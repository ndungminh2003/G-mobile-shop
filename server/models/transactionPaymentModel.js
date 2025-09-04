const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var TransactionPayment = new mongoose.Schema(
  {
    vnp_OrderInfo: String,
    vnp_CardType: String,
    vnp_BankTranNo: String,
    vnp_BankCode: String,
    vnp_Amount: String,
    vnp_TxnRef: String,
    vnp_TransactionNo: String,
    vnp_TmnCode: String,
    vnp_SecureHash: String,
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("TransactionPayments", TransactionPayment);
