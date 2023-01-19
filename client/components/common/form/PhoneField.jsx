import { useField } from 'formik';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MuiPhoneNumber from 'material-ui-phone-number';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiFormControl-root': {
      '&:hover :not(.Mui-error)': {
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
      },
      marginBottom: theme.spacing(2),
      '& fieldset': {
        borderRadius: '16px',
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
    },
  },
  input: {
    '&.MuiInputBase-root': {
      backgroundColor: theme.palette.background.form,
      borderRadius: '16px',
      color: theme.palette.text.primary,
    },
  },
  label: {
    '&.MuiInputLabel-root': {
      color: theme.palette.text.primary,
    },
  },
}));

const PhoneField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <MuiPhoneNumber
      {...field}
      className={classes?.root}
      fullWidth
      label={label}
      onChange={(value) => field.onChange({ target: { value, name: field.name } })}
      defaultCountry={'do'}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant={'outlined'}
      onlyCountries={['do']}
      InputProps={{ className: classes?.input }}
      InputLabelProps={{ className: classes?.label }}
      {...props}
    />
  );
};

PhoneField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default PhoneField;
