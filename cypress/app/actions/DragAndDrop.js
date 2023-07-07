import Action from '../action.js';
import { Commands } from '../constants.js';

export default class DragAndDrop extends Action  {
    command = Commands.DragAndDrop;
    
    run(params) {
        this.parseParams(params);
        assert.fail(this.keyword.name + ' not implemented');
        return this.app;
    }
}

