import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET as string;


export const signToken = (payload: {id: number, role: string}) => {
  return jwt.sign(payload, jwtSecret, {expiresIn: "2d"})
}

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000
}
