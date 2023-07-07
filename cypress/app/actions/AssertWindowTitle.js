import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertWindowTitle extends Action  {
    command = Commands.AssertWindowTitle;
    
    run(params) {
        this.parseParams(params);
        cy.title().should('eq', this.value);
        return this.app;
    }
}

