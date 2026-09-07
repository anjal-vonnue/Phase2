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

export async function listTasks() {
  try {
    const tasks = await readTasks();
    tasks.forEach((task: TaskType) => {
      console.log("-----------------------------");
      console.log("id: ", task.id);
      console.log("name: ", task.name);
      console.log("completed: ", task.completed);
    });
  } catch (error) {
    console.log("error while listing all tasks, ", error);
  }
}

export async function completeTask(id: number) {}

export async function filterTask() {}

export async function deleteTask() {}
