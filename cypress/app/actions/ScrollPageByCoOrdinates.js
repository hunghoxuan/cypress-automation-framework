import Action from '../action.js';
import { Commands } from '../constants.js';

export default class ScrollPageByCoOrdinates extends Action  {
    command = Commands.ScrollPageByCoOrdinates;
    
    run(params) {
        this.parseParams(params);
        let valueArray = this.getValueArray(',');
        if (valueArray.length == 2) {
            cy.scrollTo(valueArray[0], valueArray[1]);
        } else {
            cy.scrollTo(this.value);
        }
        return this.app;
    }
}

