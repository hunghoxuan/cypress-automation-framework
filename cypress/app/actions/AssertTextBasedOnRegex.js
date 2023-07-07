import Action from '../action.js';
import { Commands } from '../constants.js';

//This keyword is used to validate the format of text based on regex.
//This is cannot be used to validate exact text. Please use AssertElementText to achieve it.

export default class AssertTextBasedOnRegex extends Action  {
    command = Commands.AssertTextBasedOnRegex;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('match', this.value);
        return this.app;
    }
}

