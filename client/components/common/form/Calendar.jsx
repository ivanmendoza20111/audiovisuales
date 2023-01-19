import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    '& fieldset': {
      borderRadius: '16px',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '0px',
    },
  },
  calendar: {
    backgroundColor: theme.palette.background.form,
    borderRadius: '16px',
    width: '100%',
    '& .MuiFormLabel-root': {
      marginLeft: '13px',
      transform: 'translate(0, 1.5px) scale(0.8)',
      transitionOrigin: 'top left',
      color: theme.palette.text.primary,
    },
    '& .MuiInputBase-input': {
      marginLeft: '13px',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '0px',
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.secondary,
    },
  },
  label: {
    color: theme.palette.text.primary,
  },
}));

export const Calendar = ({ label, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.root}>
      <KeyboardDatePicker
        {...field}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        variant="outline"
        format="yyyy-MM-dd"
        disableToolbar
        id="date-picker-inline"
        label={label}
        inputVariant="outlined"
        className={classes.calendar}
        onChange={(value) => field.onChange({ target: { value, name: field.name } })}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

Calendar.propTypes = {
  label: PropTypes.string,
};
