before(() => {
    //cy.log("Run before all tests - " + Cypress.currentTest.title);
    const allure = Cypress.Allure.reporter.getInterface();
    allure.writeEnvironmentInfo({
      Browser: Cypress.browser.displayName,
      Version: Cypress.browser.version,
    });
  });
  
  // after(() => {
  //   cy.log("Run after all tests - " + Cypress.currentTest.title);
  // });
  
  beforeEach(() => {
    cy.log(
      "Run before every test in every test file*******" +
        Cypress.currentTest.title);
  });
  
  afterEach(() => {
    cy.log(
      "Run after each test in every test file*******" +
        Cypress.currentTest.title);
  });