import { Router } from "express";
import { LoginRouter } from "./login.js";
import { TransactionRouter } from "./transaction.js";
import { AdminRouter } from "./admin.js";

const router = Router();

router.use("/", LoginRouter); // login, signup and logout
router.use("/transaction", TransactionRouter);

router.use("/admin", AdminRouter);

router.get("/", (_, res) => {
  res.send(_.username);
});

export const AppRouter = router;
