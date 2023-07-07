import Action from '../action.js';
import { Commands } from '../constants.js';

export default class StoreAttribute extends Action  {
    command = Commands.StoreAttribute;
    
    run(params) {
        this.parseParams(params);
        let valueArr = this.getValueArray(':');
        expect(valueArr.length).to.equal(2);
        this.getElementAttribute(this.identifier, valueArr[0]).then((value) => {
            // cy.log(value);
            this.storeAttribute(valueArr[1], value);
            // cy.log(JSON.stringify(this.app.attributes));
        });
        return this.app;
    }
}

