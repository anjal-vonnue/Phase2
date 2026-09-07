import { readFile, writeFile } from "node:fs/promises";
import { describe, expect, test, vi } from "vitest";
import { completeTask } from "../utils/taskActions.js";

vi.mock("node:fs/promises", () => ({
  readFile: vi.fn(),
}));

describe("testing task actions", () => {
  test("testing invalid id", async () => {
    vi.mocked(readFile).mockResolvedValue(
      JSON.stringify([
        { id: 0, name: "first task", completed: false },
        { id: 1, name: "second task", completed: false },
      ]),
    );
    const result = await completeTask(200);
    expect(result).toEqual("not found");
  });
});
