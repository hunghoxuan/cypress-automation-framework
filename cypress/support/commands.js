// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import SqlQueries from "../queries/sqlQueries";

const xlsx = require('node-xlsx');
const fs = require('fs');
const XLSX = require('xlsx');
const sqlQueries = new SqlQueries;


//Logging test steps in both Cypress command log and Allure report
//Not used because the custom command name is logged
//in the previous test step in the Allure reports
Cypress.Commands.add('testStep', (stepName) =>
{
    cy.allure()
    .logStep(stepName)
    .step(stepName);
});

//Selects an item from a dropdown list
Cypress.Commands.add('selectDropdownListItem', (identifier, itemName) =>
{
    cy.get(identifier)
    .contains(itemName)
    .scrollIntoView()
    .click();
});

Cypress.Commands.add('executeSQL', (sql, params) =>
{
    // cy.log("Executing SQL query: " + sql + ":" + JSON.stringify(params));
    cy.task('executeSQL', sqlQueries.getQuerySQL(sql, params)).then((result) =>
    {
        let columns = [];
        let rows = result.rows;
        //cy.log("SQL query result: " + JSON.stringify(result));

        result.metaData.map((item) => {
            columns.push(item.name);
        });
        //cy.log(JSON.stringify(result));
        result = [];
        result.push(columns);
        rows.map((row) => {
            result.push(row);
        });
        return cy.wrap(result);
    });
});

// must use task to read/write files (fs.readFileSync and fs.writeFileSync)
Cypress.Commands.add("parseXlsx", (filePath) => {
    return cy.task('parseXlsx', filePath)
});

Cypress.Commands.add("writeXlsx", (filePath, data) => {
    return new Promise((resolve, reject) => { 
        try {
            const workBook = XLSX.utils.book_new();
            const workSheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
            XLSX.writeFile(workBook, filePath);
            
            resolve(workBook);
        } catch (e) {
            return reject(e);
        } 
    });
    //return cy.task('writeXlsx', { filePath, data } )
});