import express from "express";
import { loginUser, logoutUser, registerUser } from "./controller";

const app = express();

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", logoutUser);

export default app;
