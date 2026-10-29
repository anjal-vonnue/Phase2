import type { TaskType } from "../types/types.js";

export function printTasks(tasks: TaskType[], type: "list" | "filter") {
  if (type === "filter") {
    console.log("-----------------------------");
    console.log("====== FILTERED TASKS ======");
  }

  tasks.forEach((task: TaskType) => {
    console.log("-----------------------------");
    console.log("id: ", task.id);
    console.log("name: ", task.name);
    console.log("completed: ", task.completed);
  });
}
