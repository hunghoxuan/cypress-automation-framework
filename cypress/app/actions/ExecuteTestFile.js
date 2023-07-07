import Action from '../action.js';
import { Commands } from '../constants.js';
import HelperFunctions from '../../support/helperFunctions.js';
import path from 'path';

const helper = new HelperFunctions();
export default class ExecuteTestFile extends Action  {
    command = Commands.ExecuteTestFile;
    
    run(params) {
        this.parseParams(params);
        
        if (this.value.toLocaleLowerCase().indexOf(".xlsx") < 0) {
            this.value += ".xlsx";
        }
        this.app.runFile(path.join("testcases", this.value));    
        return this.app;
    }
}

