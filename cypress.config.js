const { defineConfig } = require("cypress");

module.exports = defineConfig({
  languageSupport: ['en'],
  restartBrowserBetweenSpecFiles: true,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 5000,
  execTimeout: 5000,
  taskTimeout: 60000,
  pageLoadTimeout: 30000,
  requestTimeout: 20000,
  responseTimeout: 90000,
  downloadsFolder: 'downloads',
  apiGetTestCasesBaseUrl: 'xxxx',
  env: {
    failSilently: false,
    allureResultsPath: 'allure-results',
    allure: true,
    oracleInstantClientPath: 'C:\\oracle_client\\instantclient_21_10',
    database: {
      connectString: 'xxx',
      user: 'xx',
      password: 'xxx',
      database: 'xxx',
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'xxxx',
  },
});
