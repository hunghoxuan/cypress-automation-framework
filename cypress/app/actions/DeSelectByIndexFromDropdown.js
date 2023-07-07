import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DeSelectByIndexFromDropdown extends Action  {
    command = Commands.DeSelectByIndexFromDropdown;
    
    run(params) {
        this.parseParams(params);
        this.getElement().select(this.value);
        return this.app;
    }
}

