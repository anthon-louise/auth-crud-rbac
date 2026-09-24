import express from "express";
import { registerUser } from "./controller";

const app = express();

app.post("/register", registerUser);

export default app;
