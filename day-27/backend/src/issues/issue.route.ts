import { Router } from "express";
import {
  createIssue,
  editIssue,
  getIssues,
  getIssuesById,
} from "./issue.controller.js";

const issueRouter = Router();

issueRouter.get("/", getIssues);

issueRouter.get("/:id", getIssuesById);

issueRouter.post("/create", createIssue);

issueRouter.patch("/edit/:id", editIssue);

export default issueRouter;
