import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementOnPage extends Action  {
    command = Commands.AssertElementOnPage;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('be.visible');
        return this.app;
    }
}

