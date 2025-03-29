import { Router } from "express";
import { LoginRouter } from "./login.js";
import { TransactionRouter } from "./transaction.js";
import { AdminRouter } from "./admin.js";
import { AccountRouter } from "./account.js";
import { loggedIn } from "../middlewares/auth/auth.js";

const router = Router();

router.use("/", LoginRouter); // login, signup and logout
router.use("/transaction", loggedIn, TransactionRouter);
router.use("/account", loggedIn, AccountRouter);

router.use("/admin", AdminRouter);

router.get("/", (_, res) => {
  res.send(_.username);
});

export const AppRouter = router;
