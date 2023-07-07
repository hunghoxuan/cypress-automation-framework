/// <reference types="cypress" />

const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const mysql = require('mysql');
const oracleDb = require('oracledb');
const xlsx = require('node-xlsx');
const fs = require('fs');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
let attributes = new Map();

// function queryMySql(query, connectionInfo) {
//   // creates a new mysql connection using credentials from cypress.json env's
//   const connection = mysql.createConnection(connectionInfo)
//   // start connection to db
//   connection.connect()
//   // exec query + disconnect to db as a Promise
//   return new Promise((resolve, reject) => {
//     connection.query(query, (error, results) => {
//       if (error) reject(error)
//       else {
//         connection.end()
//         return resolve(results)
//       }
//     })
//   })
// }

function queryMySql(query, connectionInfo) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(connectionInfo)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}

const executeSQL = async(query, connectionInfo) =>
{
    let connection;
    try
    {
      connection = await oracleDb.getConnection(connectionInfo);
      const result = await connection.execute(query);
      await connection.commit();
      return result;
    } catch(error) {
      console.log("Error -> " + error);
      return error;
    } finally {
      if (connection) {
        try {
          connection.close();
        } catch(error) {
          console.log("Error -> " + error);
        }
      }
    }
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    oracleDb.initOracleClient({ libDir: config.env.oracleInstantClientPath });
    allureWriter(on, config);
    
    // reset this value before every test run
    on('before:run', (details) => {
      attributes = new Map();
      return details;
    });
    on('task', { getAttributes() { return attributes }, });
    
    on('task', { downloadFile }); //Cypress file Download
    on('task', { executeSQL: query => { return executeSQL(query, config.env.database) }, }); //For running sql query
    on('before:browser:launch', (browser = {}, options) => {
            const downloadDirectory = config['downloadsFolder'].replace(/\\/g, "\\\\"); //path.join(__dirname, '..', Cypress.env('downloadsFolder'));

            if (fs.existsSync(downloadDirectory)) {
                fs.rmdirSync(downloadDirectory, { recursive: true });
            }

            if (browser.family === 'chromium') {
                options.preferences.default['download'] = { default_directory: downloadDirectory }
                return options
            }
            if (browser.family === 'firefox') {
                options.preferences['browser.download.folderList'] = 2;
                options.preferences['browser.download.dir'] = downloadDirectory;
                options.preferences['browser.helperApps.neverAsk.saveToDisk'] = 'text/csv';
                return options;
            }
        });
    on('task', { 
        parseXlsx: (filePath) =>  { 
          return new Promise((resolve, reject) => { 
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath)); 
              resolve(jsonData);
            } catch (e) {
              reject(e);
            } 
          });
        },
      }); 

}