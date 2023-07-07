import { App } from "../app/app";

const app = new App();
const path = require("path");

it.only("Testcase: {{clientId}}/{{testId}}", () => {
  app.runFile(path.join("testcases", "{{testId}}.xlsx"));
});
