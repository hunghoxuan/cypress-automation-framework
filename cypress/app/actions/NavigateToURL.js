import Action from '../action.js';
import { Commands } from '../constants.js';

export default class NavigateToURL extends Action  {
    command = Commands.NavigateToURL;
    
    run(params) {
        this.parseParams(params);
        cy.visit(this.value);
        return this.app;
    }
}