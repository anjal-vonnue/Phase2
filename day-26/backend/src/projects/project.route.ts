import { Router } from "express";

const projectRouter = Router();

projectRouter.get("/", (req, res) => {
  res.send("project get route");
});

projectRouter.post("/create", (req, res) => {});
