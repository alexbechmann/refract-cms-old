import * as React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { PropertyEditorProps } from '../properties/property-editor-props';
import MomentUtils from '@date-io/moment';
import * as Icons from '@material-ui/icons';
import moment from 'moment';
import { Theme, withStyles, WithStyles } from '@material-ui/core';

export interface DatePickerOptions {}

const styles = (theme: Theme) => ({
  editor: {
    width: '100%'
  }
});

interface Props extends PropertyEditorProps<Date>, WithStyles<typeof styles> {}

const DatePickerEditor = (props: Props) => {
  const date = props.value || new Date();
  const { classes } = props;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        className={classes.editor}
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

export default (options: DatePickerOptions = {}) =>
  withStyles(styles)(DatePickerEditor) as React.ComponentType<PropertyEditorProps<Date>>;
