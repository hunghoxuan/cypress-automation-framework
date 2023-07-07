import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementTextContains extends Action  {
    command = Commands.AssertElementTextContains;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('contain', this.value);
        return this.app;
    }
}

