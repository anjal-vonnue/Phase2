import { version } from "node:os";

export function getCwd(): Record<string, string> {
  console.log("current working directory: ", process.cwd());
  return {
    cwd: process.cwd(),
  };
}

export function getEnv() {
  console.log(process.env);
  return {
    env: process.env,
  };
}

export function getVersion() {
  console.log(process.version);
  return {
    version: process.version,
  };
}
