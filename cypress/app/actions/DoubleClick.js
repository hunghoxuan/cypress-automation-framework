import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DoubleClick extends Action  {
    command = Commands.DoubleClick;
    
    run(params) {
        this.parseParams(params);
        this.getElement().dblclick();
        return this.app;
    }
}

