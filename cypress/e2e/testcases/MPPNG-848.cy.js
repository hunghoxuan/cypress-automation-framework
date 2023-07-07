import {App} from "../../app/app";

const app = new App();
const path = require("path");

it.only("Testcase: /MPPNG-848", () => {
  app.runFile(path.join("testcases", "MPPNG-848.xlsx")).then((data) => {
    cy.log(JSON.stringify(data));
  });
});
