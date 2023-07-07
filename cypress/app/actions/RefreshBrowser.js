import Action from '../action.js';
import { Commands } from '../constants.js';

export default class RefreshBrowser extends Action  {
    command = Commands.RefreshBrowser;
    
    run(params) {
        this.parseParams(params);
        cy.reload();
        return this.app;
    }
}

