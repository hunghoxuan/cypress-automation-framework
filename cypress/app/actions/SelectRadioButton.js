import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SelectRadioButton extends Action  {
    command = Commands.SelectRadioButton;
    
    run(params) {
        this.parseParams(params);
        this.getElement().check();
        return this.app;
    }
}

