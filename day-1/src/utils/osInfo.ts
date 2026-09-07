import os from "os";

export function getOsInfo(): void {
  console.log(`OS Platform: ${os.platform()}`);
  console.log(`OS Type: ${os.type()}`);
  console.log(`OS Release: ${os.release()}`);
  console.log(`CPU Architecture: ${os.arch()}`);
  console.log(`Hostname: ${os.hostname()}`);
}

export function getMemInfo(): void {
  const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
  const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
  console.log(`Memory: ${freeMemGB}GB free of ${totalMemGB}GB`);
}
