import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

import adminRouter from "./modules/admin/route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRouter);


app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
