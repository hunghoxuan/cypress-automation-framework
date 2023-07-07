import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SelectByVisibleTextFromDropdown extends Action  {
    command = Commands.SelectByVisibleTextFromDropdown;
    
    run(params) {
        this.parseParams(params);
        this.getElement().select(this.value);
        return this.app;
    }
}

