import Action from '../action.js';
import { Commands } from '../constants.js';

export default class SelectAllOptionsFromDropdown extends Action  {
    command = Commands.SelectAllOptionsFromDropdown;
    
    run(params) {
        this.parseParams(params);
        this.getElement().find('option').then(options => {
            const allValues = [...options].map(o => o.value)
            this.getElement().select(allValues);
        });

        return this.app;
    }
}

