const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalAmmount: {
    type: Number,
    default: 0,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
