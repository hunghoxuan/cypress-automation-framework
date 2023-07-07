import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SwitchToAlertWindowDismiss extends Action  {
    command = Commands.SwitchToAlertWindowDismiss;
    
    run(params) {
        this.parseParams(params);
        cy.on("window:confirm", (s) => {
            return false;
        });
        return this.app;
    }
}

