import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DeSelectRadioButton extends Action  {
    command = Commands.DeSelectRadioButton;
    
    run(params) {
        this.parseParams(params);
        this.getElement().uncheck();
        return this.app;
    }
}

