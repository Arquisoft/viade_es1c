module.exports = {
    server: {
      command: "npm start",
      port: 3000,
      launchTimeout: 90000,
      debug: true,
    },
    launch: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ignoreDefaultArgs: ["--disable-extensions"],
    },
    browser: "chromium",
    browserContext: "default",
  };