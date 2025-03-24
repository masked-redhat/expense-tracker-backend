import { Schema, model } from "mongoose";
import types from "../constants/types.js";

const transactionTypes = {
  EXPENSE: "EXPENSE",
  INCOME: "INCOME",
};

const transactionSchema = new Schema({
  username: types.INDEXED(types.STR_REQ),
  value: types.NUM_REQ,
  type: { type: types.STRING, enum: Object.values(transactionTypes) },
  message: types.STRING,
  currentBalance: types.NUM_REQ,
  createdAt: { type: types.NUMBER, default: Date.now },
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
