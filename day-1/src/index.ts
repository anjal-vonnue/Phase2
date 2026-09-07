import { getCwd, getEnv } from "./utils/fileInfo.js";
import { getMemInfo, getOsInfo } from "./utils/osInfo.js";

type commandType = "version" | "os" | "memory" | "cwd" | "env";

function commandProccesser(command: commandType, json: boolean) {
  switch (command) {
    case "version": {
      console.log(process.version);

      break;
    }

    case "os": {
      const result = getOsInfo();
      if (json) console.log(result);

      break;
    }

    case "memory": {
      const result = getMemInfo();
      if (json) console.log(result);
      break;
    }

    case "cwd": {
      const result = getCwd();
      if (json) console.log(result);
      break;
    }

    case "env": {
      const result = getEnv();
      if (json) console.log(result);
      break;
    }

    default: {
      console.log("<---------------------------------------->");
      console.log("          enter a valid command");
      console.log("<---------------------------------------->");
      console.log("version: for node version");
      console.log("os: for operating system informations");
      console.log("memory: for memory details");
      console.log("cwd: for current working directory");
      console.log("env: for enviornment variables");
      console.log("<---------------------------------------->");
    }
  }
}

const args = process.argv.slice(2);

const command = args[0] as commandType;
if (args.includes("--json")) {
  console.log("inside if");

  if (command) commandProccesser(command, true);
} else {
  console.log("inside else");
  if (command) commandProccesser(command, false);
}
