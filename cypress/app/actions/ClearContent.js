import Action from '../action.js';
import { Commands } from '../constants.js';

export default class ClearContent extends Action  {
    command = Commands.ClearContent;
    
    run(params) {
        this.parseParams(params);
        this.getElement().clear(); // .type('{selectall}{backspace}{selectall}{backspace}')
        return this.app;
    }
}

