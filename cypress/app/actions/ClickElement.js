import Action from '../action.js';
import { Commands } from '../constants.js';

export default class ClickElement extends Action  {
    command = Commands.ClickElement;
    
    run(params) {
        this.parseParams(params);
        // this.getElement().click();
        this.getElement().eq(0).as('btn').click();
        // if (this.value > 1) {
        //     cy.get('@btn').click();
        // }
        // Cypress._.times(this.value, () => {  this.getElement().click({ multiple: true }); });
        return this.app;
    }
}

