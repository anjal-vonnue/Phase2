export function getCwd(): void {
  console.log("current working directory: ", process.cwd());
}

export function getEnv(): void {
  console.log(process.env);
}
