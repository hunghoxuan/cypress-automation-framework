import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SelectByIndexFromDropdown extends Action  {
    command = Commands.SelectByIndexFromDropdown;
    
    run(params) {
        this.parseParams(params);
        this.getElement().select(this.value);
        return this.app;
    }
}

