import express from "express";
import {
  addTask,
  completeTask,
  deleteTask,
  getTaskbyId,
  listTasks,
} from "./utils/taskActions.js";

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

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await listTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "falied to fetch tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await addTask(req.body.name);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "error while adding task" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await getTaskbyId(Number(req.params.id));
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: "task not found" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await completeTask(Number(req.params.id));
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: "task not found" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const tasks = await deleteTask(Number(req.params.id));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ error: "task not found" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "invalid route" });
});

export default app;
