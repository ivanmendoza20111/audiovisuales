import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogAction: {
    justifyContent: 'center',
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
    },
  },
}));

const Button = ({ text, size, color, variant, onClick, ...other }) => {
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button text="No" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
        <Button text="Sí" onClick={confirmDialog.onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  confirmDialog: PropTypes.object,
  setConfirmDialog: PropTypes.func,
};

Button.propTypes = {
  text: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  other: PropTypes.any,
};
