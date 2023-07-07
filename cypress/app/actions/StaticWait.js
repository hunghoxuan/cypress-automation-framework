import Action from '../action.js';
import { Commands } from '../constants.js';

export default class StaticWait extends Action  {
    command = Commands.StaticWait;
    
    run(params) {
        this.parseParams(params);
        cy.wait(this.value * 1000);
        return this.app;
    }
}

