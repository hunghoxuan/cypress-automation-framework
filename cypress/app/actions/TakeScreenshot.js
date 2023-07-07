import Action from '../action.js';
import { Commands } from '../constants.js';

export default class TakeScreenshot extends Action  {
    command = Commands.TakeScreenshot;
    
    run(params) {
        this.parseParams(params);
        cy.screenshot();
        return this.app;
    }
}

