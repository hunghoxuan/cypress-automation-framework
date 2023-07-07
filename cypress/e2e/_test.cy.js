import { App } from "../app/app";

const app = new App();
const path = require("path");

it.only("Testcase: /", () => {
  app.runFile(path.join("testcases", ".xlsx"));
});
