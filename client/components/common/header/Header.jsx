import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import useAuthStore from '@/stores/authStore';

const drawerWidth = 250;

const styles = (theme) => ({
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.default,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 45,
    backgroundColor: theme.palette.background.greenBackground,
  },
  menuButtonShift: {
    marginLeft: -15,
    color: theme.palette.background.greenBackground,
  },
  button: {
    color: theme.palette.background.greenBackground,
  },
  flex: {
    flex: 1,
  },
});

const Header = ({ classes, navDrawerOpen, handleToggleDrawer }) => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <AppBar className={classNames(classes.appBar, navDrawerOpen && classes.appBarShift)}>
        <Toolbar>
          <IconButton
            aria-label="Menu"
            onClick={handleToggleDrawer}
            className={classNames(
              !navDrawerOpen && classes.menuButton,
              navDrawerOpen && classes.menuButtonShift
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}></Typography>
          <Button className={classes.button} onClick={handleLogOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  navDrawerOpen: PropTypes.bool,
  actions: PropTypes.any,
  handleToggleDrawer: PropTypes.func,
};

export default withStyles(styles)(Header);
