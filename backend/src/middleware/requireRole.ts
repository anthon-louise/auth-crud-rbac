import { Request, Response, NextFunction } from "express";
import { Role } from "../types/authUser";
import { AppError } from "../errors/AppError";

export const requireRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError("Forbidded", 403);
    }

    next();
  }
}
