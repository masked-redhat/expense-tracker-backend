import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.send("hello");
});

export const AppRouter = router;
