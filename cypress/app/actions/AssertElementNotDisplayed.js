import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementNotDisplayed  extends Action  {
    command = Commands.AssertElementNotDisplayed ;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('not.be.visible');
        return this.app;
    }
}

