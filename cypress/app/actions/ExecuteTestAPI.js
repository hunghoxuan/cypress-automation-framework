import Action from '../action.js';
import { Commands } from '../constants.js';
import HelperFunctions from '../../support/helperFunctions.js';

const helper = new HelperFunctions();
export default class ExecuteTestAPI extends Action  {
    command = Commands.ExecuteTestAPI;
    
    run(params) {
        this.parseParams(params);
        
        this.app.runAPI(this.value);
        return this.app;
    }
}

