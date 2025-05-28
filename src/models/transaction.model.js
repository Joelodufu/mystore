const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },

  amount: {
    type: Number,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false, // Set to false by default for new transactions
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
