import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementText extends Action  {
    command = Commands.AssertElementText;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('have.text', this.value);
        return this.app;
    }
}

