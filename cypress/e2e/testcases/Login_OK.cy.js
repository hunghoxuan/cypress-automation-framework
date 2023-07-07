import {App} from "../../app/app";

const app = new App();
const path = require("path");

it.only("Testcase: /Login_OK", () => {
  // app.runFile(path.join("testcases", "Login_OK.xlsx")).then((data) => {
  //   cy.log(JSON.stringify(data));
  // });
  const steps = app.Actions;
   steps.NavigateToURL.run({ value: "https://warpappsrv.rs2.com/nextgen-mp/#/login", message: 'visit login page'});
   steps.InputText.run({ identifier: "[data-test = 'login-form-username-input-field']", message: 'enter username', value: "nextgen"});
   steps.InputText.run({ identifier: "div[data-test = 'login-form-password-field'] input", message: 'enter password', value: "Rs2Adm1n!"});
   steps.ClickElement.run({ identifier: "[data-test = 'login-form-handle-login-button']", message: 'click login button', value : 1});
   steps.StaticWait.run({ value: 5, message: 'wait for 5 seconds'});
   steps.AssertCurrentURL.run({ value: "https://warpappsrv.rs2.com/nextgen-mp/#/dashboard", message: 'validate dashboard page after login'});
   
   app.saveToExcel("Login_OK.xlsx");
});
