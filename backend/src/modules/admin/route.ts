import express from "express";
import { getUsers } from "./controller";
import { auth } from "../../middleware/auth";
import { requireRole } from "../../middleware/requireRole";

const router = express.Router();

router.use(auth, requireRole("admin"));

router.get("/", getUsers);

export default router;
