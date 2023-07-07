import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DeSelectAllFromDropdown extends Action  {
    command = Commands.DeSelectAllFromDropdown;
    
    run(params) {
        this.parseParams(params);
        this.getElement().select([]);
        return this.app;
    }
}

