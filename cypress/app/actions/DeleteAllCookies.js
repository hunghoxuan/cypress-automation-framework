import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DeleteAllCookies extends Action  {
    command = Commands.DeleteAllCookies;
    
    run(params) {
        this.parseParams(params);
        cy.clearCookies();
        return this.app;
    }
}

