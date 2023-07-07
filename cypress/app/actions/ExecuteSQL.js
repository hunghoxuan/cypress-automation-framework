import Action from '../action.js';
import { Commands } from '../constants.js';
import HelperFunctions from '../../support/helperFunctions.js';

const helper = new HelperFunctions();
export default class ExecuteSQL extends Action  {
    command = Commands.ExecuteSQL;
    
    run(params) {
        this.parseParams(params);
        let valueArr = this.getValueArray(':');
        if (valueArr.length == 1) {
            valueArr.push(valueArr[0]);
            valueArr[0] = 'data';
        }
        expect(valueArr.length).to.equal(2);

        let data = null;
        cy.executeSQL(this.identifier).then((result) => {
            let value = null;
            // result = helper.getData(result);
            if (valueArr[0].toLocaleLowerCase() == 'length') {
                value = result.length;
            } else if (valueArr[0].toLocaleLowerCase() == 'data') {
                value = JSON.stringify(result);
            } else {
                let tmpArr = valueArr[0].split(';');
                if (tmpArr.length == 1)
                    tmpArr.push("*");
                cy.log('tmpArr: ' + JSON.stringify(tmpArr));
                value = JSON.stringify(helper.getData(result, tmpArr[0], tmpArr[1]));
            }
            cy.log(value);
            this.storeAttribute(valueArr[1], value);
            data = result;
        });
        return cy.wrap(data);
    }
}

