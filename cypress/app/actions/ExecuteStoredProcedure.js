import Action from '../action.js';
import { Commands } from '../constants.js';

export default class ExecuteStoredProcedure extends Action  {
    command = Commands.ExecuteStoredProcedure;
    
    run(params) {
        this.parseParams(params);
        cy.executeSQL("BEGIN " + this.value + "; END;").then((result) => {
            cy.log(JSON.stringify(result));
        });
        return this.app;
    }
}

