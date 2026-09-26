import { Router } from "express";
import {
  createIssue,
  editIssue,
  getIssues,
  getIssuesById,
} from "./issue.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const issueRouter = Router();

issueRouter.use(authenticate);

issueRouter.get("/", getIssues);

issueRouter.get("/:id", getIssuesById);

issueRouter.post("/create", createIssue);

issueRouter.patch("/edit/:id", editIssue);

export default issueRouter;
