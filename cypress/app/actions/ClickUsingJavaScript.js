import Action from '../action.js';
import { Commands } from '../constants.js';

export default class ClickUsingJavaScript extends Action  {
    command = Commands.ClickUsingJavaScript;
    
    run(params) {
        this.parseParams(params);
        Cypress.$(this.identifier).trigger('click');
        return this.app;
    }
}

