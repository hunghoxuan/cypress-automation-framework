import {App} from "../../app/app";

const app = new App();
const config = Cypress.config();

it.only('TEST_MPPNG-703', () =>
{
   app.runFile(path.join('testcases', 'MPPNG-703.xlsx')).then((data) => {
      cy.log(JSON.stringify(data));
   });
});