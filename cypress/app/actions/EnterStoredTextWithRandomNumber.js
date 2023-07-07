import Action from '../action.js';
import { Commands } from '../constants.js';

/*
This keyword is used to append  the value captured by StoreAttribute keyword  with randomNumber and input the text on the field
Already stored value is appended with randomly generated numbers and it will be entered in to textbox identified.
*/
export default class EnterStoredTextWithRandomNumber extends Action  {
    command = Commands.EnterStoredTextWithRandomNumber;
    
    run(params) {
        this.parseParams(params);
        var randomNumber = Math.floor(Math.random() * 1000000000);
        var textToEnter = this.getAttribute(this.value) + randomNumber;
        this.getElement().clear().type(textToEnter);
        return this.app;
    }
}

