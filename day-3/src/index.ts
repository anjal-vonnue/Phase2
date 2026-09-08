import http from "node:http";
import {
  addTask,
  completeTask,
  deleteTask,
  getTaskbyId,
  listTasks,
} from "./utils/taskActions.js";

const server = http.createServer(async (req, res) => {
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.end("hello world\n");

  const { method, url } = req;
  if (!url) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("invalid url");
    return;
  }
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  const id = pathname.split("/")[2];

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // for getting all tasks
  if (method === "GET" && pathname === "/tasks" && !id) {
    const tasks = await listTasks();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  }
  // for adding new tasks to the list
  else if (method === "POST" && pathname === "/tasks" && !id) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const taskName = JSON.parse(body);
        const newTask = await addTask(taskName.name);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newTask));
      } catch (error) {}
    });
  }
  // for getting a particular task with id
  else if (id && method === "GET") {
    try {
      const task = await getTaskbyId(Number(id));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(task));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Task not found" }));
    }
  }
  // for completing a task
  else if (id && method === "PATCH") {
    try {
      const task = await completeTask(Number(id));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(task));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Task not found" }));
    }
  }
  // for deleting a task with id
  else if (id && method === "DELETE") {
    try {
      const tasks = await deleteTask(Number(id));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(tasks));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Task not found" }));
    }
  }
  // for invalid routes
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
