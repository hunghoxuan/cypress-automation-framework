import Action from '../action.js';
import { Commands } from '../constants.js';

export default class MouseOver extends Action  {
    command = Commands.MouseOver;
    
    run(params) {
        this.parseParams(params);
        cy.get(identifier).trigger('mouseover');
        return this.app;
    }
}

