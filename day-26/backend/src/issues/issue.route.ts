import { Router } from "express";

const ticketRouter = Router();

ticketRouter.get("/", (req, res) => {
  res.send("ticket get route");
});

ticketRouter.get("/:id", (req, res) => {
  res.send("ticket get id");
});

ticketRouter.post("/create", (req, res) => {
  res.send("ticket creation");
});

ticketRouter.patch("/edit/:id", (req, res) => {
  res.send("ticket patch");
});

export default ticketRouter;
