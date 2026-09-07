import { describe, expect, test } from "vitest";
import { getCwd, getEnv, getVersion } from "../utils/fileInfo.js";
import { version } from "node:os";
import { getMemInfo, getOsInfo } from "../utils/osInfo.js";

describe("tests", () => {
  test("currend working directory", () => {
    expect(getCwd()).toEqual({
      cwd: process.cwd(),
    });
  });

  test("env", () => {
    expect(getEnv()).toEqual({
      env: process.env,
    });
  });

  test("version", () => {
    expect(getVersion()).toEqual({
      version: process.version,
    });
  });

  test("memroy", () => {
    const result = getMemInfo();
    expect(result["Total Memory (GB)"]).toBeGreaterThan(0);
  });

  test("os platform", () => {
    const result = getOsInfo();
    expect(result["OS Platform"]).toEqual("linux");
  });
});
