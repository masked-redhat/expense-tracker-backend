import { Router } from "express";
import { loggedIn } from "../middlewares/auth/auth.js";
import Transaction from "../models/Transaction.js";
import dbTransaction from "../db/transactions/transaction.js";
import User from "../models/User.js";
import { isIncome, isNumber } from "../utils/checks.js";
import { transactionPerPage } from "../constants/pagination.js";

const router = Router();

router.use(loggedIn);

router.get("/", async (req, res) => {
  const username = req.username;
  const body = req.query;

  const page = isNumber(body.get("page")) ? body.get("page") : 1;

  const [offset, limit] = [(page - 1) * transactionPerPage, transactionPerPage];

  try {
    const transactions = await Transaction.find({ username })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .select("-__v");

    res.ok("Transactions", { transactions, nextPage: page + 1 });
  } catch (err) {
    console.log(err);
    res.serverError();
  }
});

router.post("/", async (req, res) => {
  const username = req.username;
  const body = req.body;
  body.setFields("value type message");

  if (body.anyNuldefined("value message").length !== 0)
    return res.failure("Message and the value of money is required");
  isIncome("type", body) ? null : body.set("type", "EXPENSE");

  const [value, type] = body.bulkGet("value type");

  const t = await dbTransaction();
  try {
    const user = await User.findOne({ username }, null, { session: t.session });

    const newTransaction = await Transaction.insertMany(
      [{ ...body.data, username }],
      { session: t.session }
    );

    user.currentBalance += (isIncome(type) ? 1 : -1) * value;
    await user.save({ session: t.session });

    res.created("Transacted", { transaction: newTransaction });
    await t.commit();
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.serverError();
  }
});

router.delete("/:id", async (req, res) => {
  const username = req.username;
  const id = req.params.id;

  const t = await dbTransaction();

  try {
    const transaction = await Transaction.findById(id);
    if (transaction.username !== username) {
      await t.rollback();
      return res.forbidden("Not yours");
    }

    const { value, type } = transaction;
    await Transaction.deleteOne({ _id: id }, { session: t.session });

    const user = await User.findOne({ username });
    user.currentBalance -= (isIncome(type) ? 1 : -1) * value;
    await user.save({ session: t.session });

    res.ok("Deletion successfull");
    await t.commit();
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.serverError();
  }
});

export const TransactionRouter = router;
