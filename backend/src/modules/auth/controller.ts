import bcrypt from "bcrypt";
import asynHandler from "express-async-handler";
import { Request, Response } from "express";
import { loginSchema, registerSchema } from "./schema";
import { pool } from "../../config/db";
import { AppError } from "../../errors/AppError";
import { User } from "./type";
import { COOKIE_OPTIONS, signToken } from "../../utils/token";

export const registerUser = asynHandler(async (req: Request, res: Response) => {
  const {username, password} = registerSchema.parse(req.body);

  const existingUser = await pool.query(`
    SELECT
    id
    FROM users
    WHERE username=$1
    `, [username]);

  if (existingUser.rows.length > 0) {
    throw new AppError("Username already exists", 409);
  }

  const hashedPassword = bcrypt.hash(password, 10);

  type NewUser = Pick<User, 'id' | 'role'>;

  const userResult = await pool.query<NewUser>(`
    INSERT INTO
    users (username, password)
    VALUES ($1, $2)
    RETURNING id, username, password, created_at, role
    `, [username, hashedPassword]);

  const user = userResult.rows[0];
  const token = signToken({id: user.id, role: user.role});

  res.cookie("token", token, COOKIE_OPTIONS);
  
  res.status(201).json({
    message: "Registered successfully"
  })
});

export const loginUser = asynHandler(async (req: Request, res: Response) => {
  const {username, password} = loginSchema.parse(req.body);

  type UserLogin = Pick<User, "id" | "role" | "password">

  const userResult = await pool.query<UserLogin>(`
    SELECT
    id, username, role, password
    FROM users
    WHERE username=$1`
    , [username]);

  if (userResult.rows.length === 0) {
    throw new AppError("Invalid username or password", 404);
  }


  const isMatch = bcrypt.compare(password, userResult.rows[0].password);

  if (!isMatch) {
    throw new AppError("Invalid username or password", 401);
  }

  const user = userResult.rows[0];
  const token = signToken({id: user.id, role: user.role});

  res.cookie("token", token, COOKIE_OPTIONS);
  res.status(200).json({
    message: "Loggedin successfully"
  })
});

export const logoutUser = asynHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(200).json({
    message: "Logout successfully"
  })
})
