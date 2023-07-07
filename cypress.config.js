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
  apiGetTestCasesBaseUrl: 'http://192.168.102.125:9192/Rs2/rs2/gettestcase',
  env: {
    failSilently: false,
    allureResultsPath: 'allure-results',
    allure: true,
    oracleInstantClientPath: 'C:\\oracle_client\\instantclient_21_10',
    database: {
      connectString: '172.31.47.250:1520/orc10',
      user: 'bw3',
      password: 'bw3data',
      database: 'rs2sp_uat_1',
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'https://warpappsrv.rs2.com/nextgen-mp/',
  },
});
