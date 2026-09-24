import express from "express";
import ticketRouter from "./issues/issue.route.js";

const app = express();

app.use("/tickets", ticketRouter);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

export default app;
