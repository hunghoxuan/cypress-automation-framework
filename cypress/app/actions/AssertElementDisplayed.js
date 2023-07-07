import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementDisplayed extends Action  {
    command = Commands.AssertElementDisplayed;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('be.visible');
        return this.app;
    }
}

