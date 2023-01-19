import { makeStyles } from '@material-ui/core/styles';
import { default as MaterialTextField } from '@material-ui/core/TextField';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    '& fieldset': {
      borderRadius: '16px',
    },
    '& .Mui-disabled': {
      color: theme.palette.text.disabled,
      cursor: 'not-allowed',
    },
  },
  input: {
    backgroundColor: theme.palette.background.form,
    borderRadius: '16px',
  },
  label: {
    color: theme.palette.text.primary,
  },
}));

const TextField = ({ label, shrink = true, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const isMultiline = props?.type === 'textarea';

  return (
    <MaterialTextField
      {...field}
      className={classes?.root}
      fullWidth
      label={label}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant={'outlined'}
      InputProps={{ className: classes?.input }}
      InputLabelProps={{ className: classes?.label, ...(shrink && { shrink: true }) }}
      multiline={isMultiline}
      minRows={isMultiline ? 4 : 1}
      {...props}
    />
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  shrink: PropTypes.bool,
};

export default TextField;
