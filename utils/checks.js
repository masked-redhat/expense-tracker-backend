import { transactionTypes } from "../models/Transaction.js";

export const isNumber = (value) => {
  try {
    value = Number(value);
  } catch {}
  return typeof value === "number" && value !== NaN;
};

export const isIncome = (field, obj = null) => {
  if (obj === null) return field === transactionTypes.INCOME;
  return obj.get(field);
};

export const isArray = (value) => Array.isArray(value);
