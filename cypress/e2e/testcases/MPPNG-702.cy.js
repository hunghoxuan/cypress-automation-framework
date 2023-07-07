import { App } from "../app/app";

const app = new App();
const path = require("path");

it.only("Testcase: /MPPNG-702", () => {
  app.runFile(path.join("testcases", "MPPNG-702.xlsx"));
});
