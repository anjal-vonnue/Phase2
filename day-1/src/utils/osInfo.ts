import os from "os";

export function getOsInfo(): Record<string, string> {
  console.log(`OS Platform: ${os.platform()}`);
  console.log(`OS Type: ${os.type()}`);
  console.log(`OS Release: ${os.release()}`);
  console.log(`CPU Architecture: ${os.arch()}`);
  console.log(`Hostname: ${os.hostname()}`);
  return {
    "OS Platform": os.platform() as string,
    "OS Type": os.type(),
    "OS Release": os.release(),
    "CPU Architecure": os.arch() as string,
    Hostname: os.hostname(),
  };
}

export function getMemInfo(): Record<string, string> {
  const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
  const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
  console.log(`Memory: ${freeMemGB}GB free of ${totalMemGB}GB`);
  return {
    "Total Memory (GB)": totalMemGB,
    "Free Memory (GB)": freeMemGB,
  };
}
