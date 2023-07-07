import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertCurrentURL extends Action  {
    command = Commands.AssertCurrentURL;
    
    run(params) {
        this.parseParams(params);
        cy.url().should('eq', this.value);
        return this.app;
    }
}

