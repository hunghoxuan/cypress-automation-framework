import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SwitchToWindow extends Action  {
    command = Commands.SwitchToWindow;
    
    run(params) {
        this.parseParams(params);
        cy.contains(windowName).click();
        return this.app;
    }
}

