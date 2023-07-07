import { App } from "../app/app";

const app = new App();
const config = Cypress.config();

it.only("Test API: {{clientId}}/{{testId}}", () => {
  const api = config.apiGetTestCasesBaseUrl + "/{{clientId}}/{{testId}}";
  app.runAPI(api);
});
