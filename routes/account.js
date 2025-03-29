import { Router } from "express";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import dbTransaction from "../db/transactions/transaction.js";
import ReqBody from "../utils/request.js";

const router = Router();

router.get("/", async (req, res) => {
  const user = new ReqBody(req.user, "username currentBalance");

  res.ok("User account information", { user: user.data });
});

router.delete("/", async (req, res) => {
  const username = req.username;

  const t = await dbTransaction();
  try {
    await User.deleteOne({ username }, { session: t.session });
    await Transaction.deleteMany({ username }, { session: t.session });

    res.redirect("/logout");
    await t.commit();
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.serverError();
  }
});

export const AccountRouter = router;
