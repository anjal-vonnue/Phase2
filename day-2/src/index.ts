import {
  addTask,
  completeTask,
  deleteTask,
  filterTask,
  listTasks,
} from "./utils/taskActions.js";

async function commandProccessor(args: string[]) {
  const command = args[0];
  switch (command) {
    case "add": {
      if (args[1]) {
        await addTask(args[1]);
      }
      break;
    }

    case "list": {
      await listTasks();
      break;
    }

    case "filter": {
      if (args[1] === "completed") {
        await filterTask("completed");
      } else if (args[1] === "pending") {
        await filterTask("pending");
      } else {
        console.log("pass a valid filter command");
      }
      break;
    }

    case "complete": {
      let id: number;
      if (args[1]) {
        id = Number(args[1]);
        await completeTask(id);
      } else {
        console.log("pass a valid id argument");
      }
      break;
    }

    case "delete": {
      let id: number;
      if (args[1]) {
        id = Number(args[1]);
        await deleteTask(id);
      } else {
        console.log("pass a valid id argument");
      }
      break;
    }
  }
}

const args = process.argv.slice(2);
// console.log(args);
commandProccessor(args);
