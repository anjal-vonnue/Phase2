import crypto from "crypto";
import type { NextFunction, Request, Response } from "express";

export interface IdRequest extends Request {
  requestId?: string;
}

export function requestIdMiddleware(
  req: IdRequest,
  res: Response,
  next: NextFunction,
) {
  const requestId = req.header("x-request-id") || crypto.randomUUID();

  req.requestId = requestId;

  res.setHeader("x-request-id", requestId);

  next();
}
