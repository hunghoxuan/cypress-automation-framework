import Action from '../action.js';
import { Commands } from '../constants.js';

export default class CloseBrowser extends Action  {
    command = Commands.CloseBrowser;
    
    run(params) {
        this.parseParams(params);
        return this.app;
    }
}

