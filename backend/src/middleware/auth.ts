import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { AuthUser } from "../types/authUser";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
      req.user = decoded;
    } catch (err) {
      throw new AppError("Unauthorized", 401);
    }
}
