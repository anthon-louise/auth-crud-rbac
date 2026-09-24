import bcrypt from "bcrypt";
import asynHandler from "express-async-handler";
import { Request, Response } from "express";
import { registerSchema } from "./schema";
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
