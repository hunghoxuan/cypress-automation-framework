import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SelectByValueFromDropdown extends Action  {
    command = Commands.SelectByValueFromDropdown;
    
    run(params) {
        this.parseParams(params);
        this.getElement().select(this.value);
        return this.app;
    }
}

