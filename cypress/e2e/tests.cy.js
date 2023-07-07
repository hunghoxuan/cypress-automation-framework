/// <reference types="cypress" />

import App from "../app/app";
import HelperFunctions from "../support/helperFunctions";
import SqlQueries from "../queries/sqlQueries";
import path from 'path';

const app = new App();
const sqlQueries = new SqlQueries();
const helper = new HelperFunctions();
const config = Cypress.config();

beforeEach(() =>
{
   cy.on('uncaught:exception', (err, runnable) =>  {
      // returning false here prevents Cypress from
      // failing the test
      return false;
   });
   app.runFile(path.join('testcases', 'Login_OK.xlsx')).then((data) => {
      cy.log(JSON.stringify(data));
   });
});

afterEach(() =>
{
   
});

it('TEST_LOGIN_OK', () =>
{
   app.runFile(path.join('testcases', 'Login_OK.xlsx')).then((data) => {
      cy.log(JSON.stringify(data));
   });
});

it('TEST_MPPNG-848', () =>
{
   app.runFile(path.join('testcases', 'MPPNG-848.xlsx')).then((data) => {
      cy.log(JSON.stringify(data));
   });
});

it('TEST_MPPNG-702', () =>
{
   app.runFile(path.join('testcases', 'MPPNG-702.xlsx')).then((data) => {
      cy.log(JSON.stringify(data));
   });
});

it.only('TEST_MPPNG-703', () =>
{
   app.runFile(path.join('testcases', 'MPPNG-703.xlsx')).then((data) => {
      cy.log(JSON.stringify(data));
   });
});

it('TEST_MPPNG-1042', () =>
{
   app.runFile(path.join('testcases', 'MPPNG-1042.xlsx')).then((data) => {
      cy.log(JSON.stringify(data));
   });
});

it('Test API - Client: 0002/ TestId: 10394', () => {
   const api = config.apiGetTestCasesBaseUrl + '/0002/10394';
   app.runAPI(api).then((data) => {
      cy.log(JSON.stringify(data));
   });
});

it('Test LOGIN and save to RS2 Automation format', () =>
{
   const steps = app.Actions;
   steps.NavigateToURL.run({ value: "https://warpappsrv.rs2.com/nextgen-mp/#/login", message: 'visit login page'});
   steps.InputText.run({ identifier: "[data-test = 'login-form-username-input-field']", message: 'enter username', value: "nextgen"});
   steps.InputText.run({ identifier: "div[data-test = 'login-form-password-field'] input", message: 'enter password', value: "Rs2Adm1n!"});
   steps.ClickElement.run({ identifier: "[data-test = 'login-form-handle-login-button']", message: 'click login button', value : 1});
   steps.StaticWait.run({ value: 5, message: 'wait for 5 seconds'});
   steps.AssertCurrentURL.run({ value: "https://warpappsrv.rs2.com/nextgen-mp/#/dashboard", message: 'validate dashboard page after login'});
   
   app.saveToExcel("Login_OK.xlsx");
});

it('Test get Data', () => {
   let data = [
      ["column1", "column2", "column3"],
      ["value1", "value2", "value3"],
      ["value4", "value5", "value6"],
      ["value7", "value8", "value9"],
      ["value10", "value11", "value12"],
      ["value13", "value14", "value15"]
   ];

   let data1 = [
      {"column1": "value1", "column2": "value2", "column3": "value3"},
      {"column1": "value4", "column2": "value5", "column3": "value6"},
      {"column1": "value7", "column2": "value8", "column3": "value9"},
      {"column1": "value10", "column2": "value11", "column3": "value12"},
      {"column1": "value13", "column2": "value14", "column3": "value15"}
   ];

   let items = helper.getData(data, "*");
   cy.log(JSON.stringify(items));
});

it('Test executeSQL', () =>
{
   const steps = app.Actions;
   
   // steps.ExecuteSQL.run({ value: `select sysdate from dual`});
   steps.ExecuteSQL.run({ 
      identifier: `select * from BW3.cis_client_details where institution_number='00002001' and client_number='00000036'`, 
      value: `RECORD_DATE;1:result` })
   .then((result) => {
      let val = app.getAttribute('result');
      cy.log('GET 11:' + JSON.stringify(val));
   });
   
   // cy.wait(5000);
   // // cy.wait("sql");
   let result = app.getAttribute('result');
   cy.log('GET haha:' + JSON.stringify(result));
 
   // steps.ExecuteSQL.run({ value: sqlQueries.addMerchant('00002001', '00000501', '00000502') });
});