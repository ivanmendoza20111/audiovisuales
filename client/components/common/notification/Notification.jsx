import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

export const Notification = ({ notify, setNotify }) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

Notification.propTypes = {
  notify: PropTypes.object,
  setNotify: PropTypes.func,
};
