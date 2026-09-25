import express from "express";
import issueRouter from "./issues/issue.route.js";

const app = express();

app.use("/issues", issueRouter);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

export default app;
