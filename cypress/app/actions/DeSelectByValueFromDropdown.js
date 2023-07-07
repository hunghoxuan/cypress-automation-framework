import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DeSelectByValueFromDropdown extends Action  {
    command = Commands.DeSelectByValueFromDropdown;
    
    run(params) {
        this.parseParams(params);
        this.getElement().select(this.value);
        return this.app;
    }
}

