import { readFile, writeFile } from "node:fs/promises";
import type { TaskType } from "../types/types.js";

export async function readTasks() {
  try {
    const tasks = await readFile("tasks.json", "utf-8");

    if (!tasks.trim()) {
      return [];
    }

    const parsedTasks = JSON.parse(tasks) as TaskType[];

    if (!Array.isArray(parsedTasks)) {
      return [];
    }
    return parsedTasks;
  } catch (error) {
    console.log("error while reading tasks, ", error);
    return [];
  }
}

export async function saveTasks(tasks: TaskType[]) {
  try {
    const stringifiedTasks = JSON.stringify(tasks);
    await writeFile("tasks.json", stringifiedTasks, "utf-8");
  } catch (error) {
    console.log("error while savings tasks, ", error);
  }
}
