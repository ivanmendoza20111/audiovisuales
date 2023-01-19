import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    '& fieldset': {
      borderRadius: '16px',
    },
  },
  input: {
    backgroundColor: theme.palette.background.form,
    borderRadius: '16px',
  },
  label: {
    color: theme.palette.text.primary,
  },
  timePicker: {
    backgroundColor: theme.palette.background.form,
    borderRadius: '16px',
    width: '100%',
    '& .MuiFormLabel-root': {
      marginLeft: '13px',
      transform: 'translate(0, 1.5px) scale(0.8)',
      transitionOrigin: 'top left',
      color: '#ffffff',
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
}));

export const HourPicker = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.root}>
      <Grid container justifyContent="space-around">
        <KeyboardTimePicker
          {...field}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          variant="outline"
          id="time-picker-inline"
          label={label}
          inputVariant="outlined"
          inputProps={{
            step: 300, // 5 min
          }}
          className={classes.timePicker}
          onChange={(value) => field.onChange({ target: { value, name: field.name } })}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          keyboardIcon={<QueryBuilderOutlinedIcon />}
          {...props}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

HourPicker.propTypes = {
  label: PropTypes.string.isRequired,
  shrink: PropTypes.bool,
};
