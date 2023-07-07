import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DeSelectByVisibleTextFromDropdown extends Action  {
    command = Commands.DeSelectByVisibleTextFromDropdown;
    
    run(params) {
        this.parseParams(params);
        this.getElement().select(this.value);
        return this.app;
    }
}

