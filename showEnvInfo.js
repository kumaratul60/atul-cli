import os from "os";
import fetch from "node-fetch";
import boxen from "boxen";
import chalk from "chalk";

export async function showEnvInfo() {
  // System/device info (all offline, instantaneous)
  const host = os.hostname();
  const platform = os.platform();
  const osType = os.type();
  const arch = os.arch();
  const cpus = os.cpus();
  const cpuCount = cpus.length;
  const totalMemGB = (os.totalmem() / 1024 ** 3).toFixed(2);
  const freeMemGB = (os.freemem() / 1024 ** 3).toFixed(2);
  const uptimeMins = (os.uptime() / 60).toFixed(0);
  const username = os.userInfo().username;

  // Local network interfaces (offline)
  const nets = os.networkInterfaces();
  let localList = "";
  for (const [iface, addrs] of Object.entries(nets)) {
    for (const addr of addrs) {
      if (addr.family === "IPv4" && !addr.internal) {
        localList += `\n  • [${iface}] IP: ${addr.address}  MAC: ${addr.mac}`;
      }
    }
  }

  // Public IP, location, weather (API only when requested)
  let publicIp = "Unavailable";
  let location = "Unknown",
    weather = "Unavailable";
  try {
    publicIp = (await fetch("https://api.ipify.org?format=json").then((r) => r.json())).ip;
    const geoRes = await fetch("http://ip-api.com/json").then((r) => r.json());
    if (geoRes.status === "success") {
      const { city, regionName, country, lat, lon } = geoRes;
      location = `${city}, ${regionName}, ${country}`;
      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      ).then((r) => r.json());
      weather = `🌡️ ${wRes.current_weather.temperature}°C  💨 ${wRes.current_weather.windspeed} km/h`;
    }
  } catch {
    /* silent fail for offline use or blocked APIs */
  }

  // Date/time
  const dateTime = new Date().toLocaleString("en-IN");

  // Output
  console.log(
    boxen(
      chalk.cyan.bold(`
Host:         ${host}
Platform:     ${platform}
OS Type:      ${osType}
Architecture: ${arch}
CPU Cores:    ${cpuCount}
Total Memory: ${totalMemGB} GB
Free Memory:  ${freeMemGB} GB
System Uptime (minutes): ${uptimeMins}
Username:     ${username}
${localList ? `Local IPs:    ${localList}` : "Local IPs:    Unavailable"}
Public IP:    ${publicIp}
Location:     ${location}
Date/Time:    ${dateTime}
Weather:      ${weather}
      `),
      { padding: 1, borderColor: "green", margin: 1 }
    )
  );
}
