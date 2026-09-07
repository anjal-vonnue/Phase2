import type { TaskType } from "../types/types.js";
import { readTasks, saveTasks } from "./storageServices.js";

export async function addTask(name: string) {
  try {
    const tasks = await readTasks();
    let id = 0;
    if (tasks.length > 0) {
      id = Math.max(...tasks.map((task: TaskType) => task.id)) + 1;
    }
    tasks.push({
      id: id,
      name: name,
      completed: false,
    });
    console.log(tasks);

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

export async function completeTask(id: number) {
  try {
    const tasks = await readTasks();
    let flag = 0;
    let updatedTasks: TaskType[];

    updatedTasks = tasks.map((task: TaskType) => {
      if (task.id === id) {
        flag = 1;
        return {
          ...task,
          completed: true,
        };
      } else {
        return task;
      }
    });

    await saveTasks(updatedTasks);

    if (flag) {
      console.log(`task with id: ${id} got updated`);
    } else {
      console.log(`task with id: ${id} does not exists`);
    }
  } catch (error) {}
}

export async function filterTask() {}

export async function deleteTask() {}
