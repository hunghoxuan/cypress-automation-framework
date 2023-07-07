import Action from '../action.js';
import { Commands } from '../constants.js';

export default class EnterTextUsingJavaScript extends Action  {
    command = Commands.EnterTextUsingJavaScript;
    
    run(params) {
        this.parseParams(params);
        Cypress.$(this.identifier()).type(this.value);
        return this.app;
    }
}

