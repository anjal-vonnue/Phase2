import type { Request, Response } from "express";
import prisma from "../db/database.js";

export async function getProjects(req: Request, res: Response) {
  try {
    const projects = await prisma.project.findMany();

    if (!projects) {
      return res.status(404).json({ error: "projects don't found" });
    }

    return res.json({ data: projects });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "error while getting projects from the backend" });
  }
}
