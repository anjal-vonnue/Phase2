import {
  addTask,
  completeTask,
  deleteTask,
  getTaskbyId,
  listTasks,
} from "../utils/taskActions.js";
import type { Request, Response } from "express";

export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await listTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "falied to fetch tasks" });
  }
}

export async function addTaskToDb(req: Request, res: Response) {
  try {
    const task = await addTask(req.body.name);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "error while adding task" });
  }
}

export async function getTasksbyIdController(req: Request, res: Response) {
  try {
    const task = await getTaskbyId(Number(req.params.id));
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: "task not found" });
  }
}

export async function completeTaskController(req: Request, res: Response) {
  try {
    const task = await completeTask(Number(req.params.id));
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: "task not found" });
  }
}

export async function deleteTaskController(req: Request, res: Response) {
  try {
    const tasks = await deleteTask(Number(req.params.id));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ error: "task not found" });
  }
}

export function handleInvalidRoute(req: Request, res: Response) {
  res.status(404).json({ error: "invalid route" });
}
