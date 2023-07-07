import Action from '../action.js';
import { Commands } from '../constants.js';

//This keyword is used to assert the value captured by StoreAttribute keyword against the locator .
//Already stored value is compared for equality with the identified field value.

export default class AssertStoredAttributeNotContains extends Action  {
    command = Commands.AssertStoredAttributeNotContains;
    
    run(params) {
        this.parseParams(params);
        this.valueArray = this.getValueArray(':');
        expect(this.valueArray.length).to.equal(2);
        this.getElementAttribute(this.identifier, this.valueArray[0]).then((value) => {
            expect(value).not.to.contain(this.getAttribute(this.valueArray[1]));
        });
        return this.app;
    }
}

