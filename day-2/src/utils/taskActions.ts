import type { TaskType } from "../types/types.js";
import { printTasks } from "./printer.js";
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
    printTasks(tasks, "list");
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

export async function filterTask(type: "completed" | "pending") {
  try {
    const tasks = await readTasks();
    let filterTasks: TaskType[];
    if (type === "completed") {
      filterTasks = tasks.filter((tasks) => tasks.completed === true);
    } else {
      filterTasks = tasks.filter((tasks) => tasks.completed === false);
    }
    printTasks(filterTasks, "filter");
  } catch (error) {
    console.log("error while listing filtered tasks, ", error);
  }
}

export async function deleteTask(id: number) {
  try {
    const tasks = await readTasks();
    let newTasksArr: TaskType[];
    newTasksArr = tasks.filter((task) => task.id !== id);

    await saveTasks(newTasksArr);
  } catch (error) {
    console.log("error while deleting tasks, ", error);
  }
}
