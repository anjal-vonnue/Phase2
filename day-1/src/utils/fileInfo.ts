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
