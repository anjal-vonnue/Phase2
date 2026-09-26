import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.services.js";
import { error } from "node:console";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "email, and password are required",
      });
    }

    const result = await loginUser(email, password);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.message === "INVALID CREDENTIALS") {
      return res.status(401).json({
        error: "invalid credentials",
      });
    }

    return res.status(500).json({ error: "internal server error" });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        error: "name, email, passoword, and role are required",
      });
    }

    const result = await registerUser(name, email, password, role);

    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.message === "INVALID CREDENTIALS") {
      return res.status(401).json({
        error: "invalid credentials",
      });
    }
    return res.status(500).json({ error: "internal server error" });
  }
}
