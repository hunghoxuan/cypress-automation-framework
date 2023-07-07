import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SwitchToAlertWindowAccept extends Action  {
    command = Commands.SwitchToAlertWindowAccept;
    
    run(params) {
        this.parseParams(params);
        cy.on("window:confirm", (s) => {
            return true;
        });
        return this.app;
    }
}

