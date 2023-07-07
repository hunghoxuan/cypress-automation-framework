import {App} from "../../app/app";

const app = new App();
const config = Cypress.config();

it('TEST_MPPNG-702', () =>
{
   app.runFile(path.join('testcases', 'MPPNG-702.xlsx')).then((data) => {
      cy.log(JSON.stringify(data));
   });
});