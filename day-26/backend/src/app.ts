import express from "express";
import issueRouter from "./issues/issue.route.js";
import cors from "cors";
import morgan from "morgan";
import projectRouter from "./projects/project.route.js";

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use("/issues", issueRouter);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

export default app;
