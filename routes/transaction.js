import { Router } from "express";
import { loggedIn } from "../middlewares/auth/auth.js";
import Transaction from "../models/Transaction.js";
import dbTransaction from "../db/transactions/transaction.js";
import User from "../models/User.js";
import { isArray, isIncome, isNumber } from "../utils/checks.js";
import { transactionPerPage } from "../constants/pagination.js";

const num = (value) => (isIncome(value) ? 1 : -1);

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

    res.ok("Transactions", {
      transactions,
      nextPage: transactions.length <= transactionPerPage ? null : page + 1,
    });
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

    let [newTransaction] = await Transaction.create(
      [{ ...body.data, username }],
      { session: t.session }
    );

    newTransaction = newTransaction.toObject();
    delete newTransaction.__v;

    user.currentBalance += num(type) * value;
    await user.save({ session: t.session });

    res.created("Transacted", {
      transaction: newTransaction,
      newBalance: user.currentBalance,
    });
    await t.commit();
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.serverError();
  }
});

router.delete("/", async (req, res) => {
  const username = req.username;
  const ids = req.body.get("ids", []);
  if (!isArray(ids)) return res.failure("Bad format for ids");

  let balanceToBeDeducted = 0; // Changed from `const` to `let`

  const t = await dbTransaction();
  try {
    const deletedDocs = await Transaction.find({ _id: { $in: ids } }).session(
      t.session
    );

    await Transaction.deleteMany({ _id: { $in: ids } }, { session: t.session });

    for (const d of deletedDocs) {
      balanceToBeDeducted += num(d.type) * d.value;
    }

    const user = await User.findOne({ username }).session(t.session);
    user.currentBalance -= balanceToBeDeducted;

    await user.save({ session: t.session });

    await t.commit();
    res.ok("Deletion Successful", { newBalance: user.currentBalance });
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
