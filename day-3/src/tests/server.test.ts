import { afterAll, beforeAll, describe, expect, test } from "vitest";
import server from "../server.js";
import { error } from "node:console";
let baseUrl: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server.listen(0, () => {
      const port = server.address();

      if (typeof port === "object" && port !== null) {
        baseUrl = `http://localhost:${port.port}`;
      }

      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

describe("GET /tasks", () => {
  test("--- returns array", async () => {
    const response = await fetch(`${baseUrl}/tasks`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });
});

describe("POST /tasks", () => {
  test("--- returns new task", async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "task from test",
      }),
    });

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty("name", "task from test");
  });
});

describe("GET /tasks/:id", () => {
  test("--- return a error when task with id doest exist", async () => {
    const response = await fetch(`${baseUrl}/tasks/1`);
    expect(response.status).toBe(404);
    const data = await response.json();
    console.log(data);
    expect(data).toEqual({ error: "Task not found" });
  });
});

describe("GET /tasks/:id", () => {
  test("--- return a task with specific id", async () => {
    const createResponse = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test task",
      }),
    });
    expect(createResponse.status).toBe(201);
    const createdTask = await createResponse.json();
    const id = createdTask.id;
    const response = await fetch(`${baseUrl}/tasks/${id}`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("id", id);
    expect(data).toHaveProperty("name", "test task");
  });
});

describe("PATCH /tasks/:id", () => {
  test("--- return updated task", async () => {
    const createResponse = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "this task is going to updated",
      }),
    });
    expect(createResponse.status).toBe(201);
    const createtask = await createResponse.json();
    const id = createtask.id;

    const response = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "PATCH",
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("name", "this task is going to updated");
    expect(data.completed).toBe(true);
  });
});
