import express from "express";
import issueRouter from "./issues/issue.route.js";
import cors from "cors";
import morgan from "morgan";
import projectRouter from "./projects/project.route.js";
import authRoutes from "./auth/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/issues", issueRouter);
app.use("/projects", projectRouter);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

export default app;
