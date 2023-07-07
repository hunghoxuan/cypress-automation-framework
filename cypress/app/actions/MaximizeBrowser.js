import Action from '../action.js';
import { Commands } from '../constants.js';

export default class MaximizeBrowser extends Action  {
    command = Commands.MaximizeBrowser;
    
    run(params) {
        this.parseParams(params);
        return this.app;
    }
}

