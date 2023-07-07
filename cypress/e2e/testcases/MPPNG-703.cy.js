import {App} from "../../app/app";

const app = new App();
const path = require("path");

it.only("Testcase: /MPPNG-703", () => {
  app.runFile(path.join("testcases", "MPPNG-703.xlsx"));
});
