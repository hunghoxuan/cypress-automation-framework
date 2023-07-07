import Action from '../action.js';
import { Commands } from '../constants.js';

export default class RightClickElement extends Action  {
    command = Commands.RightClickElement;
    
    run(params) {
        this.parseParams(params);
        this.getElement().eq(0).as('btn').rightclick();
        return this.app;
    }
}

