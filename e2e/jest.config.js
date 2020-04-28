module.exports = {
  preset: "jest-puppeteer",
  testRegex: "./*\\.steps\\.js$",
  testTimeout: 2000000,
  //setupFilesAfterEnv: ["./jest.setup.js"]
};

