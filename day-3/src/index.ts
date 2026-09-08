import http from "node:http";
import { listTasks } from "./utils/taskActions.js";

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

  if (method === "GET" && pathname === "/tasks") {
    const tasks = await listTasks();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  }

  if (method === "GET" && pathname === "/tasks/:id") {
  }

  if (method === "POST" && pathname === "/tasks") {
  }

  if (method === "PATCH" && pathname === "tasks/:id") {
  }

  if (method === "DELETE" && pathname === "tasks/:id") {
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
