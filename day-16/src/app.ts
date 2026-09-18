import express from "express";
import router from "./routes/ticketRoutes.js";
import authRoute from "./module/auth/auth.route.js";
import userRoute from "./module/me/me.route.js";
import { authenticate } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

app.use(authenticate, router);
app.use("/auth", authRoute);
app.use(userRoute);

export default app;
