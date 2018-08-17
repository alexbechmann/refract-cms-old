import * as React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { PropertyEditorProps } from '../properties/property-editor-props';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import * as Icons from '@material-ui/icons';
import * as moment from 'moment';

export interface DatePickerOptions {}

export default (options: DatePickerOptions = {}) => (props: PropertyEditorProps<Date>) => {
  const date = props.value || new Date();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        keyboard
        label="Masked input"
        format="DD/MM/YYYY"
        mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
        value={date}
        onChange={(momentDate: moment.Moment) => {
          props.setValue(momentDate.toDate());
        }}
        animateYearScrolling={false}
        rightArrowIcon={<Icons.ChevronRight />}
        leftArrowIcon={<Icons.ChevronLeft />}
        keyboardIcon={<Icons.Event />}
        showTodayButton
      />
    </MuiPickersUtilsProvider>
  );
};
