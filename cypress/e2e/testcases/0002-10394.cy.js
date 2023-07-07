import {App} from "../../app/app";

const app = new App();
const config = Cypress.config();

it.only("Test API: 0002/10394", () => {
  const api = config.apiGetTestCasesBaseUrl + "/0002/10394";
  app.runAPI(api);
});
