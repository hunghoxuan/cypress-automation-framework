import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementEnabled extends Action  {
    command = Commands.AssertElementEnabled;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('be.enabled');
        return this.app;
    }
}

