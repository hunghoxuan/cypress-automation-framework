import Action from '../action.js';
import { Commands } from '../constants.js';

/*
This keyword is used to assert the element is present on UI or not.
Given text in the "value" section is picked-up as KEY and searches the StoredAttribute variable and  builds the locator dynamically for the element.
*/

export default class AssertElementHavingStoreAttributeText extends Action  {
    command = Commands.AssertElementHavingStoreAttributeText;

    run(params) {
        this.parseParams(params);
        this.valueArray = this.getValueArray(':');
        expect(this.valueArray.length).to.equal(2);
        this.getElementAttribute(this.identifier, this.valueArray[0]).then((value) => {
            expect(value).to.contain(this.getAttribute(this.valueArray[1]));
        });
        return this.app;
    }
}

