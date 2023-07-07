import HelperFunctions from "../support/helperFunctions";
import { Identifiers } from "./constants";
const dayjs = require('dayjs');
require('cypress-xpath');

export default class Action  {
    //data.push(["step_number", "keyword", "keyword_name", "field_name", "id_type", "id_type_name", "identifier", "value"]);
    constructor(app) {
        this.step_number = 1;
        this.keyword = '';
        this.keyword_name = '';
        this.field_name = '';
        this.id_type = '';
        this.id_type_name = '';
        this.identifier = '';
        this.value = '';

        this.app = app;
        this.command = null;
        this.helper = new HelperFunctions();
    }

    parseParams(params = null) {    
        //cy.log(this.keyword.name + ' ' + JSON.stringify(params));
        this.value = '';
        if (params == null)
            return;
        this.keyword = this.command.keyword;
        this.keyword_name = this.command.name;

        if (typeof params === 'object') {
            if (params.value != null && params.value != undefined)
                this.value = params.value;
            else if (params.url != null && params.url != undefined)
                this.value = params.url;
            else if (params.text != null && params.text != undefined)
                this.value = params.text;
            
            if (params.field_name != null && params.field_name != undefined)
                this.field_name = params.field_name;
            else if (params.message != null && params.message != undefined)
                this.field_name = params.message;

            if (params.id_type_name != null && params.id_type_name != undefined)
                this.id_type_name = params.id_type_name;
                
            if (params.id_type != null && params.id_type != undefined)
                this.id_type = params.id_type;

            if (params.identifier != null && params.identifier != undefined)
                this.identifier = params.identifier;
            else if (params.sql != null && params.sql != undefined)
                this.identifier = params.sql;
            else if (params.selector != null && params.selector != undefined)
                this.identifier = params.selector;

            if (this.id_type_name == null || this.id_type_name == undefined || this.id_type_name == '') {
                if (this.app != null) {
                    let idType = this.app.getIdType(this.identifier);
                    if (idType != null && idType != undefined) {
                        this.id_type_name = idType.name;
                        this.id_type = idType.keyword;
                    }
                }
            }
    
            this.step_number = params.step_number || (this.app != null && this.app.steps.length + 1);

            // if (!this.value instanceof String)
            //     cy.log('this.value: ' + JSON.stringify(this.value));
            if (this.value instanceof String && (this.value.indexOf('0') != 0 || this.value == '0') && this.helper.isNumeric(this.value)) {
                this.value = Number(this.value);
            }
        } else if (typeof params === 'string') {
            this.value = params;
        }
        
        if (this.app != null) {
            this.helper.testStep(`STEP ${this.step_number}. ${this.keyword_name} . ${this.field_name} . ${this.identifier} ${this.id_type_name}. ${this.value}`);
            this.app.addStep(this.field_name, this.keyword_name, this.identifier, this.value, this.id_type_name);
        }
    }

    run(params = null) {
        this.parseParams(params);
        return this.app;
    }

    getSelector(identifier = null) {
        if (identifier == null)
            identifier = this.identifier;
        if (identifier == null)
            return null;
        if (identifier.indexOf(':') > -1)
            return Cypress.$.escapeSelector(identifier);
        if (this.id_type_name != null && this.id_type_name != null && this.id_type_name == Identifiers.id.name) {
                return `#${identifier}`;
        }
        
        return identifier;
    }

    getValueArray(seperator = ':') {
        if (this.value.indexOf(seperator) > -1) {
            return this.value.split(seperator);
        }
        return [this.value];
    }

    getElement(identifier = null) {
        // cy.log(`get ` + this.identifier.name + ': ' + this.getSelector(identifier));
        let selector = this.getSelector(identifier);
        if (selector == null || selector == undefined || selector == '') {
            return null;
        }
        if (this.id_type_name != null && this.id_type_name == Identifiers.xpath.name) {
            return cy.xpath(selector);
        }
        return cy.get(selector);
    }

    storeAttribute(key, value) {
        this.app.storeAttribute(key, value);
    }

    getAttribute(key) {
        return this.app.getAttribute(key);
    }

    getElementAttribute(identifier = null, attributeName = 'text') {
        if (identifier == null || identifier == undefined || identifier == '')
            return null;
       
        if (attributeName == 'text') {
            return this.getElement(identifier).invoke('val').then((value) => {
                return value;
            });
        }
        return this.getElement(identifier).invoke('attr', attributeName).then((value) => {
            return value;
        });
    }

    getCurrentDateTime(format = 'YYYY-MM-DD') {
        return dayjs().format(format);
    }
}

