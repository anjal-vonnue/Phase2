import express from "express";
import router from "./routes/ticketRoutes.js";
import authRoute from "./module/auth/auth.route.js";
import userRoute from "./module/me/me.route.js";

const app = express();

app.use(express.json());

app.use(router);
app.use("/auth", authRoute);
app.use(userRoute);

export default app;
