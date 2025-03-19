import { Schema, model } from "mongoose";

const transactionTypes = {
  EXPENSE: "EXPENSE",
  INCOME: "INCOME",
};

const transactionSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  value: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(transactionTypes),
  },
  message: String,
  currentBalance: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
