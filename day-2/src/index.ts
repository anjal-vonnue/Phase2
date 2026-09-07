import { addTask, completeTask, listTasks } from "./utils/taskActions.js";

async function main() {
  await addTask("hello");
  await listTasks();
  await completeTask(4);
  await listTasks();
}
main();
