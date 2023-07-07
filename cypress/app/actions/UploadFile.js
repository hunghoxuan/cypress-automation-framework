import Action from '../action.js';
import { Commands } from '../constants.js';

export default class UploadFile extends Action  {
    command = Commands.UploadFile;
    
    run(params) {
        this.parseParams(params);
        this.getElement().selectFile(this.value);
        return this.app;
    }
}

