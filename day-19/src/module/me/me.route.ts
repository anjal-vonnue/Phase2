import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getUser } from "./me.controller.js";

const userRoute = Router();

/**
 * @openapi
 * /me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 */
userRoute.get("/", authenticate, getUser);

export default userRoute;
