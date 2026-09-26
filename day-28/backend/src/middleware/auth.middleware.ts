import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../generated/prisma/enums.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: UserRole;
}

interface PayloadType {
  userId: number;
  userRole: UserRole;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ error: "authentication required" });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "invalid authorization header" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET!) as PayloadType;

    req.userId = payload.userId;
    req.userRole = payload.userRole;
    next();
  } catch (error) {
    return res.status(401).json({ error: "invalid or expired token" });
  }
}
