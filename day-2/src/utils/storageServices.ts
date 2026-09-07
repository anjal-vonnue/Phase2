import { readFile, writeFile } from "node:fs/promises";
import type { TaskType } from "../types/types.js";

export async function readTasks() {
  try {
    const tasks = await readFile("tasks.json", "utf-8");
    const parsedTasks = JSON.parse(tasks);
    console.log(tasks);
  } catch (error) {
    console.log(error);
  }
}

export async function saveTasks(tasks: TaskType[]) {
  const stringifiedTasks = JSON.stringify(tasks);
  await writeFile("tasks.json", stringifiedTasks, "utf-8");
}
