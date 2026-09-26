import type { Request, Response } from "express";
import prisma from "../db/database.js";

export async function getIssues(req: Request, res: Response) {
  try {
    const issues = await prisma.issue.findMany();

    if (!issues) {
      return res.status(404).json({ error: "issues dont found" });
    }

    return res.json({ data: issues });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "error while getting issues from the database" });
  }
}

export async function getIssuesById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const issue = await prisma.issue.findFirst({
      where: {
        id: id,
      },
    });

    if (!issue) {
      return res.status(404).json({ error: "issues dont found" });
    }

    return res.json({ data: issue });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "error while getting issue by id" });
  }
}

export async function createIssue(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      status,
      priority,
      assignee,
      project,
      dueDate,
      labels,
    } = req.body;

    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        status,
        priority,
        assignee,
        project,
        dueDate,
        labels,
      },
    });

    if (!issue) {
      return res.status(400).json({ error: "error while creating issue" });
    }

    return res.status(201).json({ data: issue });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "error while creating issue" });
  }
}

export async function editIssue(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      status,
      priority,
      assignee,
      project,
      dueDate,
      labels,
    } = req.body;
    const id = Number(req.params.id);
    const issue = await prisma.issue.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        status,
        priority,
        assignee,
        project,
        dueDate,
        labels,
      },
    });

    if (!issue) {
      return res.status(400).json({ error: "error while creating issue" });
    }

    return res.status(201).json({ data: issue });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "error while updating an issue" });
  }
}
