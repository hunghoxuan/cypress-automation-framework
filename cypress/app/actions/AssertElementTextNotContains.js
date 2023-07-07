import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementTextNotContains extends Action  {
    command = Commands.AssertElementTextNotContains;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('not.contain', this.value);
        return this.app;
    }
}

