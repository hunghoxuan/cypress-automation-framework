import Action from '../action.js';
import { Commands } from '../constants.js';

// This keyword validates that value provided is present in the current URL of the browser
export default class AssertCurrentURLContains  extends Action  {
    command = Commands.AssertCurrentURLContains ;
    
    run(params) {
        this.parseParams(params);
        cy.url().should('include', this.value);
        return this.app;
    }
}

