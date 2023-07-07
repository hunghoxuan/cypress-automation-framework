import Action from '../action.js';
import { Commands } from '../constants.js';

export default class KeyboardPressKeys extends Action  {
    command = Commands.KeyboardPressKeys;
    
    run(params) {
        this.parseParams(params);
        this.getElement().type("{" + this.value.tolowerCase() + "}");
        return this.app;
    }
}

