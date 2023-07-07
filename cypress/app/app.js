import { Commands, Identifiers } from "./constants";

import Action from "./action";
import AssertCurrentURL  from "./actions/AssertCurrentURL";
import AssertCurrentURLContains from "./actions/AssertCurrentURLContains";
import AssertElementAttributeContainsStoredAttribute from "./actions/AssertElementAttributeContainsStoredAttribute";
import AssertElementAttributeValueContains from "./actions/AssertElementAttributeValueContains";
import AssertElementAttributeValueDoesNotContains from "./actions/AssertElementAttributeValueDoesNotContains";
import AssertElementDisabled from "./actions/AssertElementDisabled";
import AssertElementDisplayed from "./actions/AssertElementDisplayed";
import AssertElementEnabled from "./actions/AssertElementEnabled";
import AssertElementHavingStoreAttributeText from "./actions/AssertElementHavingStoreAttributeText";
import AssertElementNotDisplayed from "./actions/AssertElementNotDisplayed";
import AssertElementOnPage from "./actions/AssertElementOnPage";
import AssertElementText from "./actions/AssertElementText";
import AssertElementTextContains from "./actions/AssertElementTextContains";
import AssertElementTextNotContains from "./actions/AssertElementTextNotContains";
import AssertElementTextWithInputData from "./actions/AssertElementTextWithInputData";
import AssertStoredAttributeContains from "./actions/AssertStoredAttributeContains";
import AssertStoredAttributeEquals from "./actions/AssertStoredAttributeEquals";
import AssertStoredAttributeNotContains from "./actions/AssertStoredAttributeNotContains";
import AssertStoredAttributeNotEquals from "./actions/AssertStoredAttributeNotEquals";
import AssertTextBasedOnRegex from "./actions/AssertTextBasedOnRegex";
import AssertWindowTitle from "./actions/AssertWindowTitle";
import CheckForPageLoad from "./actions/CheckForPageLoad";
import ClearContent from "./actions/ClearContent";
import ClickElement  from "./actions/ClickElement";
import ClickUsingJavaScript from "./actions/ClickUsingJavaScript";
import CloseBrowser from "./actions/CloseBrowser";
import DeSelectAllFromDropdown from "./actions/DeSelectAllFromDropdown";
import DeSelectByIndexFromDropdown from "./actions/DeSelectByIndexFromDropdown";
import DeSelectByValueFromDropdown from "./actions/DeSelectByValueFromDropdown";
import DeSelectByVisibleTextFromDropdown from "./actions/DeSelectByVisibleTextFromDropdown";
import DeSelectCheckBox from "./actions/DeSelectCheckBox";
import DeSelectRadioButton from "./actions/DeSelectRadioButton";
import DeleteAllCookies from "./actions/DeleteAllCookies";
import DoubleClick from "./actions/DoubleClick";
import DownloadFile from "./actions/DownloadFile";
import DragAndDrop from "./actions/DragAndDrop";
import EnterStoredTextWithRandomNumber from "./actions/EnterStoredTextWithRandomNumber";
import EnterTextUsingJavaScript from "./actions/EnterUsingJavaScript";
import ExecuteSQL from "./actions/ExecuteSQL";
import ExecuteStoredProcedure from "./actions/ExecuteStoredProcedure";
import ExecuteTestAPI from "./actions/ExecuteTestAPI";
import ExecuteTestFile from "./actions/ExecuteTestFile";
import GetElementAttribute from "./actions/GetElementAttribute";
import HelperFunctions from "../support/helperFunctions";
import InputDataWithCurrentDateAndTime from "./actions/InputDataWithCurrentDateAndTime";
import InputText  from "./actions/InputText";
import KeyboardPressKeys from "./actions/KeyboardPressKeys";
import MaximizeBrowser from "./actions/MaximizeBrowser";
import MouseOver from "./actions/MouseOver";
import NavigateToURL  from "./actions/NavigateToURL";
import OpenBrowser from "./actions/OpenBrowser";
import RefreshBrowser from "./actions/RefreshBrowser";
import RightClickElement from "./actions/RightClickElement";
import ScrollPageByCoOrdinates from "./actions/ScrollPageByCoOrdinates";
import SelectAllOptionsFromDropdown from "./actions/SelectAllOptionsFromDropdown";
import SelectByIndexFromDropdown from "./actions/SelectByIndexFromDropdown";
import SelectByValueFromDropdown from "./actions/SelectByValueFromDropdown";
import SelectByVisibleTextFromDropdown from "./actions/SelectByVisibleTextFromDropdown";
import SelectCheckBox from "./actions/SelectCheckBox";
import SelectDateFromDatePicker from "./actions/SelectDateFromDatePicker";
import SelectDateRangeFromDatePicker from "./actions/SelectDateRangeFromDatePicker";
import SelectRadioButton from "./actions/SelectRadioButton";
import StaticWait  from "./actions/StaticWait";
import StoreAttribute from "./actions/StoreAttribute";
import SwitchToAlertWindowAccept from "./actions/SwitchToAlertWindowAccept";
import SwitchToAlertWindowDismiss from "./actions/SwitchToAlertWindowDismiss";
import SwitchToWindow from "./actions/SwitchToWindow";
import TakeScreenshot from "./actions/TakeScreenshot";
import UploadFile from "./actions/UploadFile";
import WaitTillElementNotVisible from "./actions/WaitTillElementNotVisible";
import WaitTillElementVisible from "./actions/WaitTillElementVisible";
import path from 'path';

class App extends HelperFunctions  {
    Actions = {
        NavigateToURL: new NavigateToURL(this),
        InputText: new InputText(this),
        ClickElement: new ClickElement(this),
        StaticWait: new StaticWait(this),
        AssertCurrentURL: new AssertCurrentURL(this),
        WaitTillElementVisible: new WaitTillElementVisible(this),
        WaitTillElementNotVisible: new WaitTillElementNotVisible(this),
        AssertElementAttributeValueContains : new AssertElementAttributeValueContains(this),
        AssertElementAttributeValueDoesNotContains: new AssertElementAttributeValueDoesNotContains(this),
        AssertElementDisabled : new AssertElementDisabled(this),
        AssertElementOnPage : new AssertElementOnPage(this),
        AssertElementTextContains : new AssertElementTextContains(this),
        CheckForPageLoad : new CheckForPageLoad(this),
        SwitchToWindow : new SwitchToWindow(this),
        StoreAttribute : new StoreAttribute(this),
        OpenBrowser : new OpenBrowser(this),
        ClearContent : new ClearContent(this),
        AssertElementNotDisplayed : new AssertElementNotDisplayed(this),
        MouseOver: new MouseOver(this),
        DoubleClick: new DoubleClick(this),
        DragAndDrop: new DragAndDrop(this),
        RightClickElement: new RightClickElement(this),
        ClickUsingJavaScript: new ClickUsingJavaScript(this),
        EnterTextUsingJavaScript: new EnterTextUsingJavaScript(this),
        AssertWindowTitle: new AssertWindowTitle(this),
        AssertElementText: new AssertElementText(this),
        KeyboardPressKeys: new KeyboardPressKeys(this),
        SelectByValueFromDropdown: new SelectByValueFromDropdown(this),
        SelectByIndexFromDropdown: new SelectByIndexFromDropdown(this),
        SelectByVisibleTextFromDropdown: new SelectByVisibleTextFromDropdown(this),
        DeSelectCheckBox: new DeSelectCheckBox(this),
        SelectCheckBox: new SelectCheckBox(this),
        DeSelectByValueFromDropdown: new DeSelectByValueFromDropdown(this),
        DeSelectByIndexFromDropdown: new DeSelectByIndexFromDropdown(this),
        DeSelectByVisibleTextFromDropdown: new DeSelectByVisibleTextFromDropdown(this),
        DeSelectAllFromDropdown: new DeSelectAllFromDropdown(this),
        UploadFile: new UploadFile(this),
        SwitchToAlertWindowAccept: new SwitchToAlertWindowAccept(this),
        SwitchToAlertWindowDismiss: new SwitchToAlertWindowDismiss(this),
        TakeScreenshot: new TakeScreenshot(this),
        SelectRadioButton: new SelectRadioButton(this),
        DeSelectRadioButton: new DeSelectRadioButton(this),
        RefreshBrowser: new RefreshBrowser(this),
        CloseBrowser: new CloseBrowser(this),   
        DeleteAllCookies: new DeleteAllCookies(this),
        GetElementAttribute: new GetElementAttribute(this),
        SelectAllOptionsFromDropdown: new SelectAllOptionsFromDropdown(this),
        AssertElementDisplayed: new AssertElementDisplayed(this),
        DownloadFile: new DownloadFile(this),
        AssertElementEnabled: new AssertElementEnabled(this),
        ScrollPageByCoOrdinates: new ScrollPageByCoOrdinates(this),
        AssertElementTextWithInputData: new AssertElementTextWithInputData(this),
        AssertElementTextNotContains: new AssertElementTextNotContains(this),
        AssertTextBasedOnRegex: new AssertTextBasedOnRegex(this),
        SelectDateFromDatePicker: new SelectDateFromDatePicker(this),
        SelectDateRangeFromDatePicker: new SelectDateRangeFromDatePicker(this),
        AssertStoredAttributeNotEquals: new AssertStoredAttributeNotEquals(this),
        AssertStoredAttributeEquals: new AssertStoredAttributeEquals(this),
        EnterStoredTextWithRandomNumber: new EnterStoredTextWithRandomNumber(this),
        AssertStoredAttributeContains: new AssertStoredAttributeContains(this),
        AssertStoredAttributeNotContains: new AssertStoredAttributeNotContains(this),
        AssertElementAttributeContainsStoredAttribute: new AssertElementAttributeContainsStoredAttribute(this),
        AssertCurrentURLContains: new AssertCurrentURLContains(this),
        AssertElementHavingStoreAttributeText: new AssertElementHavingStoreAttributeText(this),
        MaximizeBrowser: new MaximizeBrowser(this),
        InputDataWithCurrentDateAndTime: new InputDataWithCurrentDateAndTime(this),
        ExecuteSQL: new ExecuteSQL(this),
        ExecuteStoredProcedure: new ExecuteStoredProcedure(this),
        ExecuteTestFile: new ExecuteTestFile(this),
        ExecuteTestAPI: new ExecuteTestAPI(this),
    }

    attributes = new Map();
    steps = [];
    
    helper = new HelperFunctions();

    constructor() {
        super();
        this.init();
        this.attributes = new Map();
        cy.window.attributes = new Map();
        this.steps = [];
    }

    runFile(file) {
        cy.parseXlsx(file).then((jsonData) =>
        { 
            cy.wrap(jsonData[0].data).as('data');
        }).then((data) => {
            this.runCommands(data.slice(1)); // skip header
        }); 
        // return new Promise((resolve, reject) => {
        //     cy.parseXlsx(file).then((jsonData) =>
        //     { 
        //         cy.wrap(jsonData[0].data).as('data');
        //     }).then((data) => {
        //         this.runCommands(data.slice(1)); // skip header
        //         resolve(data);
        //     }); 
        // });
    }

    runAPI(api) {
        let commands = [];
        cy.request(api).then((response) => {
            let steps = response.body.testData.steps[0].web_steps;
            steps.forEach((step) => {
                commands.push([step.step_number, step.keyword, step.keyword_name, step.field_name, step.id_type, step.id_type_name, step.identifier, step.value]);
            });
            this.runCommands(commands);
        });
        // return new Promise((resolve, reject) => {
        //     let commands = [];
        //     cy.request(api).then((response) => {
        //         let steps = response.body.testData.steps[0].web_steps;
        //         //cy.log(JSON.stringify(steps));
        //         steps.forEach((step) => {
        //             commands.push([step.step_number, step.keyword, step.keyword_name, step.field_name, step.id_type, step.id_type_name, step.identifier, step.value]);
        //         });
        //         this.runCommands(commands);
        //         resolve(commands);
        //     });
        // });
    }

    runCommands(commands) {
        commands.forEach(command => {
            this.action(command[2], { step_number: command[0], field_name : command[3], id_type: command[4], id_type_name: command[5], identifier: command[6], value: command[7] });
        });
    }

    action(command, params) {
        let value = '' + params.value;
        let action = null;
        let field_name = '' + params.field_name;
        let identifier = '' +params.identifier;
        let step_number = '' + params.step_number;
        let id_type_name = '' + params.id_type_name;
        
        if (typeof command === 'object') {
            action = command;
            command = command.command.name;
        } else {
            let actions = Object.entries(this.Actions).map(([name, actionObj]) => { return actionObj; });
            for (let i = 0; i < actions.length; i++) {
                let actionObj = actions[i];
                if (actionObj.command.name.toLowerCase() === command.toLowerCase()) {
                    action = actionObj;
                    break;
                }
            }
        }

        if (action != null) {
            action.run({ value, field_name, identifier, id_type_name, step_number });
            return this;
        }
        
        assert.fail(`Command ${command} not found or not implemented`);
    }

    init() {
        this.steps = [];
        return this;
    }

    saveToExcel(filename) {
        let data = [];
        data.push(["step_number", "keyword", "keyword_name", "field_name", "id_type", "id_type_name", "identifier", "value"]);
        data.push(...this.steps);
        cy.writeXlsx(filename, data);
        return this;
    }

    addStep(message, command, identifier = '', value = '', id_type_name = '') {
        if (command == null)
            return this;
        if (this.steps.length === 0)
            this.init();
        let idType = this.getIdType((id_type_name == '' || id_type_name == null) ? identifier : id_type_name);
        let keyword = ''; 
        let keywordName = '';
        if (command instanceof Action) {
            keyword = command.command.keyword;
            keywordName = command.command.name;
        } else if (typeof command == 'string') {
            let cmd = this.getCommand(command);
           
            if (cmd != null) {
                keyword = cmd.keyword;
                keywordName = cmd.name;
            } 
        } else {
            keyword = command.keyword;
            keywordName = command.name;
        }
        // cy.log(`Step ${this.steps.length + 1}: ${keyword}  ${keywordName}  ${message} ${identifier} ${value}`);
        this.steps.push([this.steps.length + 1, keyword, keywordName, message, idType != null ? idType.keyword : '', idType != null ? idType.name : '', identifier, value]);
        return this;
    }

    getCommand(keyword_name) {
        let cmd = null;
        Object.entries(Commands).filter(([name, command]) => {
            if (command.name.toLowerCase() === keyword_name.toLowerCase()) {
                cmd = command;
            }
        });
        return cmd;
    }

    getIdType(identifier) {       
        if (identifier == null || typeof identifier !== 'string')
            return null;
        let id = null;
        Object.entries(Identifiers).filter(([name, idType]) => {
            if (idType.name.toLowerCase() === identifier.toLowerCase()) {
                id = idType;
            }
        });
        if (id != null)
            return id;

        if (identifier.startsWith('//')) {
            return Identifiers.xpath;
        }
        if (identifier.indexOf('[') > -1 && identifier.indexOf(']') > -1) {
            return Identifiers.css;
        }
        return null;
    }
    
    getAttributes() {
        return cy.window.attributes;
        // return this.attributes;
    }

    storeAttribute(attributeName, attributeValue) {
        // cy.log(`Storing attribute ${attributeName} with value ${attributeValue}`);
        let arr = ('' + attributeName).split(':');
        if (arr.length > 1) {
            attributeName = arr[0];
            attributeValue = arr[1];
        }
        this.getAttributes().set(attributeName, attributeValue);
        cy.writeFile('cypress/data/' + attributeName + '.data', attributeValue instanceof Object ? JSON.stringify(attributeValue): attributeValue).as('storeAttribute');
        // cy.readFile('cypress/downloads/' + attributeName + '.data').then((attributeValue) => {
        //     return attributeValue;
        // });
        return this.getAttributes();
    }

    getAttribute(attributeName) {
        // cy.readFile('cypress/downloads/' + attributeName + '.data').then((attributeValue) => {
        //     return attributeValue;
        // });
           
        if (this.getAttributes().has(attributeName)) {
            return this.getAttributes().get(attributeName);
        }
        return null;
    }
}

module.exports = { App, Commands, Identifiers };
