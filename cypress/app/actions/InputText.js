import Action from '../action.js';
import { Commands } from '../constants.js';

export default class InputText extends Action  {
    command = Commands.InputText;
    
    run(params) {
        this.parseParams(params);
        this.getElement().clear().type(this.value);
        return this.app;
    }
}

