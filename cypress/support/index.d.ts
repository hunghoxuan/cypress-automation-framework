/// <reference types="cypress" />

declare namespace Cypress 
{
    interface Chainable<Subject> 
    {
        
         /**
         * Logs the test step in both Cypress command log and Allure report
         * @example
         * cy.testStep("Test step text")
         */
         testStep(stepText: string): Chainable<any>

         /**
         * Selects an item from a dropdown list. 
         * Takes as parameters dropdown list identifier and dropdown list item name
         * @example
         * cy.selectDropdownListItem('.dropdown-list', 'Test name item')
         */
         selectDropdownListItem(identifier: string, itemName: string): Chainable<any>
    }
}