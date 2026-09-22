import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
