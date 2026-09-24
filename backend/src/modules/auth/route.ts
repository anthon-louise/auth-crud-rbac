import express from "express";
import { loginUser, registerUser } from "./controller";

const app = express();

app.post("/register", registerUser);
app.post("/login", loginUser);

export default app;
