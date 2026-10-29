import express from "express";
import {
  addTask,
  completeTask,
  deleteTask,
  getTaskbyId,
  listTasks,
} from "./utils/taskActions.js";
import {
  addTaskToDb,
  completeTaskController,
  deleteTaskController,
  getAllTasks,
  getTasksbyIdController,
  handleInvalidRoute,
} from "./controllers/controller.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.get("/tasks", getAllTasks);

app.post("/tasks", addTaskToDb);

app.get("/tasks/:id", getTasksbyIdController);

app.patch("/tasks/:id", completeTaskController);

app.delete("/tasks/:id", deleteTaskController);

app.use(handleInvalidRoute);

export default app;
