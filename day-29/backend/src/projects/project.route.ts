import { Router } from "express";
import { getProjects } from "./project.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const projectRouter = Router();

projectRouter.use(authenticate);

projectRouter.get("/", getProjects);

projectRouter.post("/create", (req, res) => {});

export default projectRouter;
