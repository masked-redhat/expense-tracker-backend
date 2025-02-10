import { Router } from "express";
import _handler from "../controllers/handler.js";

const h = _handler.logout;

const router = Router();

router.get("/", h.logout);

export const LogoutRouter = router;
