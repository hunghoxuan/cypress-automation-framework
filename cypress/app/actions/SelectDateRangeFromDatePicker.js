import Action from '../action.js';
import { Commands } from '../constants.js';

/* 
This keyword is used to select the date ranges from datePicker.
Value should contain FromDate:ToDate format
*/

export default class SelectDateRangeFromDatePicker extends Action  {
    command = Commands.SelectDateRangeFromDatePicker;

}

