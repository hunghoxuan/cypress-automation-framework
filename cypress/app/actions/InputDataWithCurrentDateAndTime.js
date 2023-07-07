import Action from '../action.js';
import { Commands } from '../constants.js';

export default class InputDataWithCurrentDateAndTime extends Action  {
    command = Commands.InputDataWithCurrentDateAndTime;
    
    run(params) {
        this.parseParams(params);
        let newValue = this.value + "_" + this.getCurrentDateTime("dd_MM_yyy_HH_mm");
        cy.log("InputDataWithCurrentDateAndTime: newValue = " + newValue);
        this.getElement().clear().type(newValue);
        this.app.storeAttribute(this.value, newValue);
        return this.app;
    }
}

