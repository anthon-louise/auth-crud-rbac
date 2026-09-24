import express from "express";
import { loginUser, logoutUser, me, registerUser } from "./controller";
import { auth } from "../../middleware/auth";

const app = express();

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", logoutUser);
app.get("/me", auth, me);

export default app;
