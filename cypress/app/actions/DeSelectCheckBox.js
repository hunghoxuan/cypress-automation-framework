import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DeSelectCheckBox extends Action  {
    command = Commands.DeSelectCheckBox;
    
    run(params) {
        this.parseParams(params);
        this.getElement().uncheck();
        return this.app;
    }
}

