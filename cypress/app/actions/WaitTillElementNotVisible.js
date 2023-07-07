import Action from '../action.js';
import { Commands } from '../constants.js';

export default class WaitTillElementNotVisible extends Action  {
    command = Commands.WaitTillElementNotVisible;
    
    run(params) {
        this.parseParams(params);
        let el = this.getElement().should('not.exist');
        return this.app;
    }
}

