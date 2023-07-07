/// <reference types="cypress" />

import { DataTypes } from '../config/constants';

//for storing reusable helper functions
class HelperFunctions
{
    validateCurrentUrl(url) 
    {
        cy.url().should("eq", url);
        cy.log("Current url is equal with expected url: " + url);
    }

    parseUrlQueryParams(url)
    {
        let queryParameters = new Map();
        const parametersArray = url.split('?')[1].split('&');

        parametersArray.forEach(parameter =>
        {
        const [key, value] = parameter.split('=');
        queryParameters.set(key, value);
        });

        return queryParameters;
    }

    //Logging test steps in both Cypress command log and Allure report
    testStep(stepName)
    {
        cy.allure()
        .logStep(stepName)
        .step(stepName);
    }


    // check if array is already in sortDirection ?
    checkIfArrayIsSorted(array, sortDirection, dataType = '', message = '') {
        array = array.map(item => this.cleanDataForSorting(item, dataType)); // clean up and convert data to correct sortable manner (numeric or date)
        let sortedArray = array.slice();
        
        if (dataType == DataTypes.Number) {
            sortedArray.sort(function(a, b) { return (a < b) ? -1 : (a > b) ? 1 : 0; });
        } else {
            sortedArray.sort(function(s1, s2) { // sort string, should aware of case sensitive
                var a = ('' + s1).toLowerCase(), b = ('' + s2).toLowerCase();            
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            });
        }
          
        if (sortDirection === "desc") {
            sortedArray.reverse();
        }

        this.checkEqual(array, sortedArray, message.length > 0 ? message : ("Check if array is sorted " + sortDirection));
        // expect(array, "Array " + array.join(', ') + " should be sorted in " + sortDirection).to.deep.equal(sortedArray);
    }

    // compare two arrays or objects 
    checkEqual(array1, array2, message = "") {
        let data1 = JSON.stringify(array1).replace('" "', ''); // clean up some 'blank' data
        let data2 = JSON.stringify(array2).replace('" "', ''); // clean up some 'blank' data
        // cy.log('Array1: ' + data1);
        // cy.log('Array2: ' + data2);
        expect(data1, message).equal(data2);
        // assert(data1 === data2, message);
    }

    formatDate(date) {
        if (typeof date === 'date' || typeof date === 'number') {
            const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
            const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date )
            return `${year}/${month}/${day}`;
        } else if (this.isDateFormat(date)) {
            if (date.indexOf("/") > 0)
                return date.split("/").reverse().join("/");
            if (date.indexOf("-") > 0)
                return date.split("-").reverse().join("-");
        } else if (typeof date === 'string' || (date.length === 10 && date.indexOf("-") > 0) ) {
            return date.split("-").reverse().join("-");
        }

        return date;
    }

    //TODO: a bit tricky, will improve it later
    isDateFormat(date) {
        if (typeof date === 'string' && date.length === 10 && (date.indexOf("/") > 0 || date.indexOf("-") > 0)) {
            return true;
        }
        return false;
    }

    isNumeric(data) {
        if (data === null || data === undefined || data === '')
            return false;
        return !isNaN(data);
    }

    //Clean up data before sorting, comparing, etc.
    cleanDataForSorting(data, dataType = '') {
        if ((dataType === '' && this.isDateFormat(data)) || dataType == DataTypes.Date) {
            return this.formatDate(data);
        } else if ((dataType === '' && !isNaN(data)) || dataType == DataTypes.Number) { // if it is a number
            return Number(data);
        }
        return this.cleanData(data);
    }

    //remove "-" and "null" from data, as sometimes it is displayed in UI as "-", but in excel it is empty
    cleanData(data) {
        if (["-", "null"].indexOf(data) >= 0)
            return "";
        return data;
    }

    cleanJson(json) {
        return json
            .replace(/([\u200B]+|[\u200C]+|[\u200D]+|[\u200E]+|[\u200F]+|[\uFEFF]+)/g, '') // remove-zero-width-space-characters
            .replace(/{""/g, '{"').replace(/"":/g, '":');
    }
    
    getSubstring(text, sub1, sub2) {
        if  (text.indexOf(sub1) < 0 || text.indexOf(sub2) < 0) return false;
        var SP = text.indexOf(sub1) + sub1.length;
        var string1 = text.substr(0, SP);
        var string2 = text.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return text.substring(SP, TP);
    }

// extract data from array from specific column
//     let data = [
//       ["column1", "column2", "column3"],
//       ["value1", "value2", "value3"],
//       ["value4", "value5", "value6"],
//    ];
//    let data1 = [
//       {"column1": "value1", "column2": "value2", "column3": "value3"},
//       {"column1": "value4", "column2": "value5", "column3": "value6"},
//    ];
//    let items = helper.getData(data, "column1,column3", "1:2");
    getData(list, columns = "*", rows = null, startIndex = 1) {
        let items = [];
        let headers = [];
        let rowDataType = '';

        // identify rowDataType
        if (rowDataType === '') {
            list.map((item, index) => {
                if (item instanceof Array) {
                    rowDataType = 'array';
                } else if (item instanceof Object) {
                    rowDataType = 'object';
            }});
        }
        if (rowDataType === 'array') {
            headers = list[0];
            list = list.slice(1); // remove header
        }

        if (rows != null && typeof rows === 'string' && rows !== '*') {
            if (rows.indexOf(':') > 0) {
                let arr = rows.split(':');
                rows = [];
                let start = Number(arr[0]) - startIndex;
                let end = Number(arr[1]) - startIndex;
                for (let i = start; i <= end; i++) {
                    rows.push('' + i);
                }
            } else {
                rows = rows.split(',');
            }
        } else if (rows != null && typeof rows === 'number') {
            rows = ['' + rows, '' + rows];
        }

        if (columns != null && typeof columns === 'string') {
            if (columns.indexOf(':') > 0) {
                let arr = columns.split(':');
                let start = this.isNumeric(arr[0]) ? (Number(arr[0]) - startIndex) : headers.indexOf(arr[0]);
                let end = this.isNumeric(arr[1]) ? (Number(arr[1]) - startIndex) : headers.indexOf(arr[1]);
                columns = [];
                for (let i = start; i <= end; i++) {
                    columns.push('' + headers[i]);
                }
            } else if (columns.indexOf(',') > 0) {
                columns = columns.split(',');
            }
        }


        if (columns === '*' || columns === 'all') {
            list.map((row) => {
                let rowItems = [];
                Object.entries(row).map(([column, value]) => { 
                    rowItems.push(value);
                });
                items.push(rowItems);
            });
        } else if (columns != null && typeof columns === 'string') {
            let columnName = columns;
            list.map((row) => {
                Object.entries(row).map(([column, value]) => {
                    // cy.log('columnName: ' + columnName + ' - column: ' + column + ' - value: ' + value + ' - tmp: ' + ('' + (Number(column) + startIndex)) + ' - tmp2: ' + headers.indexOf(columnName));
                    if ((headers.length > 0 && column == (headers.indexOf(columnName)) || (('' + (Number(column) + startIndex)) == ('' + columnName))) || (!this.isNumeric(columnName) && (column.indexOf(columnName) > -1))) 
                        items.push(value);
                });
            });
            // cy.log('items: ' + items);
        } else if (columns != null && columns instanceof Array) {
            list.map((row) => {
                let rowItems = [];
                columns.map((columnName) => {
                    Object.entries(row).map(([column, value]) => { 
                    if ((headers.length > 0 && column == (headers.indexOf(columnName)) || (('' + (Number(column) + startIndex)) == ('' + columnName))) || (!this.isNumeric(columnName) && column.indexOf(columnName) > -1)) 
                        rowItems.push(value);
                    });
                });
                items.push(rowItems);
            });
        } else {
            items = list;
        }
        // cy.log('rowDataType: ' + rowDataType);
        // cy.log('headers: ' + JSON.stringify(headers));
        // cy.log('columns: ' + JSON.stringify(columns));
        // cy.log('items: ' + JSON.stringify(items));
        // cy.log('rows: ' + JSON.stringify(rows));
        if (rows != null && rows.length > 0) {
            let result = [];
            items.map((row, index) => {
                if (rows.indexOf('' + (index + startIndex)) >= 0)
                    result.push(row);
            });
            items = result;  
        }

        // if single item, return item
        if (items.length === 1 && typeof items[0] === 'string')
            return items[0];
        if (items.length === 1 && items[0] instanceof Array && items[0].length === 1)
            return items[0][0];
            
        return items;
    }
}
export default HelperFunctions;