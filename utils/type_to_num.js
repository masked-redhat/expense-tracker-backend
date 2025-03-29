import { transactionTypes } from "../models/Transaction.js";

export const isIncome = (field, obj = null) => {
  if (obj === null) return field === transactionTypes.INCOME;
  return obj.get(field);
};
