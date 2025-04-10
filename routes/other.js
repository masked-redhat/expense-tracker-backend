import { Router } from "express";
import { isUsernameAvailable } from "../utils/username";

const router = Router();

router.get("/check-username", async (req, res) => {
  const username = req.query.get("username");

  if (req.query.isNuldefined("username"))
    return res.failure("Username is required");

  try {
    const available = await isUsernameAvailable(username);
    if (!available) return res.failure("Username not available");

    res.ok("Username available", { isAvailable: true });
  } catch (err) {
    console.log(err);
    res.serverError();
  }
});

export const OtherRouter = router;
