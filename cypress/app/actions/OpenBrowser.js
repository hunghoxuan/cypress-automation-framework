import Action from '../action.js';
import { Commands } from '../constants.js';

export default class OpenBrowser extends Action  {
    command = Commands.OpenBrowser;
    
    run(params) {
        this.parseParams(params);
        // cy.visit('');
        return this.app;
    }
}

