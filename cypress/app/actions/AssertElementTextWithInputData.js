import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementTextWithInputData  extends Action  {
    command = Commands.AssertElementTextWithInputData ;
    
    run(params) {
        this.parseParams(params);
        this.getElement().should('have.text', this.getAttribute(this.value));
        return this.app;
    }
}

