import Action from '../action.js';
import { Commands } from '../constants.js';

export default class WaitTillElementVisible extends Action  {
    command = Commands.WaitTillElementVisible;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('be.visible');
        return this.app;
    }
}

