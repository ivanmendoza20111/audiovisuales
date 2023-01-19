import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    borderRadius: '16px',
    color: theme.palette.text.primary,
  },
  select: {
    backgroundColor: theme.palette.background.form,
    borderRadius: '16px',
    '& .MuiSelect-select:focus': {
      borderRadius: '16px',
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.secondary,
    },
  },
  paper: {
    backgroundColor: theme.palette.background.form,
  },
  label: {
    color: theme.palette.text.primary,
  },
}));

const DropDown = ({ label, items = [], ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <TextField
      {...field}
      select
      className={classes?.root}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      SelectProps={{ MenuProps: { classes: { paper: classes.paper } }, className: classes.select }}
      InputLabelProps={{ className: classes?.label }}
      variant={'outlined'}
      label={label}
      fullWidth
      {...props}
    >
      {items.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  shrink: PropTypes.bool,
  items: PropTypes.array.isRequired,
};

export default DropDown;
