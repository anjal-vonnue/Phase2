import { Router } from "express";
import { login, register } from "./auth.controller.js";

const authRoute = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new end user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: User created
 */
authRoute.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful
 */
authRoute.post("/login", login);

export default authRoute;
