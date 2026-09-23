import asyncHandler from "express-async-handler";
import { pool } from "../../config/db";
import { Request, Response, NextFunction } from "express";


export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const userResults = await pool.query(`
    SELECT
    id,
    username,
    password,
    role,
    created_at
    FROM users
    `);

  res.status(200).json({
    message: "User fetched",
    users: userResults.rows
  })
});
