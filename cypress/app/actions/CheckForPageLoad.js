import Action from '../action.js';
import { Commands } from '../constants.js';

export default class CheckForPageLoad extends Action  {
    command = Commands.CheckForPageLoad;
    
    run(params) {
        this.parseParams(params);
        cy.get('body').should('be.visible');
        return this.app;
    }
}

