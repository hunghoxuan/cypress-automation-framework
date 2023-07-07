import Action from '../action.js';
import { Commands } from '../constants.js';

export default class GetElementAttribute extends Action  {
    command = Commands.GetElementAttribute;
    
    run(params) {
        this.parseParams(params);
        return this.getElement().invoke('attr', this.value);
    }
}

