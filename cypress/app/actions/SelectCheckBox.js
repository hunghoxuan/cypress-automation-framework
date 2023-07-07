import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SelectCheckBox extends Action  {
    command = Commands.SelectCheckBox;
    
    run(params) {
        this.parseParams(params);
        this.getElement().check();
        return this.app;
    }
}

