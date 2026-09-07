import { getCwd } from "./utils/fileInfo.js";
import { getMemInfo, getOsInfo } from "./utils/osInfo.js";

type commandType = "version" | "os" | "memory" | "cwd" | "env";

function commandProccesser(command: commandType) {
  switch (command) {
    case "version": {
      console.log(process.version);

      break;
    }

    case "os": {
      getOsInfo();
      break;
    }

    case "memory": {
      getMemInfo();
      break;
    }

    case "cwd": {
      getCwd();
      break;
    }

    case "env": {
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
if (command) commandProccesser(command);
