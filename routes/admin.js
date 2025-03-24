import { Router } from "express";
import { loggedAsAdmin } from "../middlewares/auth/auth.js";
import User from "../models/User.js";

const router = Router();

router.use(loggedAsAdmin);

router.get("/user", async (req, res) => {
  const username = req.query.get("username", null);
  if (username === null) return res.failure("username is neccessary");

  try {
    const user = await User.findOne({ username });
    if (user === null) return res.failure("Bad username");
    return res.ok("Requested user", { user });
  } catch (err) {
    console.log(err);
  }

  res.serverError();
});

router.delete("/user", async (req, res) => {
  const username = req.query.get("username", null);
  if (username === null) return res.failure("username is neccessary");

  try {
    const deleteResult = await User.deleteOne({ username });
    if (deleteResult.deletedCount === 1) return res.deleted();
  } catch (err) {
    console.log(err);
  }

  res.serverError();
});

export const AdminRouter = router;
