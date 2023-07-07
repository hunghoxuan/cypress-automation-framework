import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementDisabled extends Action  {
    command = Commands.AssertElementDisabled;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('be.disabled');
        return this.app;
    }
}

