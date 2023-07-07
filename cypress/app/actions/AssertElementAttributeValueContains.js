import Action from '../action.js';
import { Commands } from '../constants.js';

export default class AssertElementAttributeValueContains extends Action  {
    command = Commands.AssertElementAttributeValueContains;
    
    run(params) {
        this.parseParams(params);
        this.valueArray = this.getValueArray(':');
        expect(this.valueArray.length).to.equal(2);
        this.getElementAttribute(this.identifier, this.valueArray[0]).then((value) => {
            expect(value).to.contain(this.valueArray[1]);
        });
        return this.app;
    }
}

