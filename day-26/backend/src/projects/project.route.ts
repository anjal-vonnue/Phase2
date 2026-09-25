import { Router } from "express";
import { getProjects } from "./project.controller.js";

const projectRouter = Router();

projectRouter.get("/", getProjects);

projectRouter.post("/create", (req, res) => {});

export default projectRouter;
