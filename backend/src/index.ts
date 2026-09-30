import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";

import adminRouter from "./modules/admin/route";
import authRouter from "./modules/auth/route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
