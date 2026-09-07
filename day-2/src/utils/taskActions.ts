import type { TaskType } from "../types/types.js";
import { readTasks, saveTasks } from "./storageServices.js";

export async function addTask(name: string) {
  try {
    const tasks = await readTasks();
    const id = Math.max(...tasks.map((task: TaskType) => task.id)) + 1;
    tasks.push({
      id: id,
      name: name,
      completed: false,
    });

    await saveTasks(tasks);
  } catch (error) {
    console.log("error while adding task, ", error);
  }
}

export async function listTasks() {}

export async function completeTask() {}

export async function filterTask() {}

export async function deleteTask() {}
