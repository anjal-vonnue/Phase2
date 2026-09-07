import { readFile } from "node:fs/promises";

import { describe, expect, vi, test } from "vitest";
import { readTasks } from "../utils/storageServices.js";

vi.mock("node:fs/promises", () => ({
  readFile: vi.fn(),
}));

describe("testing storage", () => {
  test("testing empy tasks.json", async () => {
    vi.mocked(readFile).mockResolvedValue("");
    const tasks = await readTasks();

    expect(tasks).toEqual([]);
  });

  test("testing invalid json", async () => {
    vi.mocked(readFile).mockResolvedValue("{invalid json}");
    const tasks = await readTasks();
    expect(tasks).toEqual([]);
  });

  test("testing promise error", async () => {
    vi.mocked(readFile).mockRejectedValue("error");
    const tasks = await readTasks();
    expect(tasks).toEqual([]);
  });
});
