import { CardHeader, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DevicesOutlinedIcon from '@material-ui/icons/DevicesOutlined';
import HomeIcon from '@material-ui/icons/Home';
import TableChartIcon from '@material-ui/icons/TableChart';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const drawerWidth = 250;
const Name = `ADMINISTRADOR`; // prodriamos usar una llamada del nombre del admin

const StyledPaper = styled(Paper)(() => ({
  backgroundColor: '#017051',
  color: '#FFF',
}));

const styles = (theme) => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  cardHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: 10,
    weight: 10,
    padding: 50,
    marginLeft: 25,
    marginBotton: 25,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

const MiniDrawer = (props) => {
  let { navDrawerOpen, classes } = props;

  const links = [
    {
      label: 'Panel General',
      link: '/',
      icon: <HomeIcon />,
    },

    {
      label: 'Usuario',
      link: '/usuario',
      icon: <AccountCircleOutlinedIcon />,
    },

    {
      label: 'Productos',
      link: '/Productos',
      icon: <DevicesOutlinedIcon />,
    },
    {
      label: 'Reservaciones',
      link: '/reservaciones',
      icon: <TableChartIcon />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.drawerPaper, !navDrawerOpen && classes.drawerPaperClose),
      }}
      open={navDrawerOpen}
    >
      <div className={classes.drawerHeader} />
      <CardHeader
        className={classes.cardHeader}
        title={
          <img
            style={{
              width: '70%',
              height: '50%',
            }}
            className={classes.headerImg}
            src="/img/logo.png"
            alt={'SAPERE ET VIVERE'}
          />
        }
      />
      <div className={classes.root}>
        <StyledPaper
          sx={{
            my: 1,
            mx: 'auto',
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar
                sx={{
                  my: 1,
                  mx: -1,
                  p: 1,
                  backgroundColor: '#013627',
                  elevation: 12,
                }}
              >
                {Name[0]}
              </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography
                sx={{
                  my: 0.5,
                  mx: 'auto',
                  p: 2,
                }}
                noWrap
              >
                {Name}
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </div>

      <List>
        <div className="box" style={{ padding: '8px 16px' }}></div>
      </List>
      <List>
        {links.map(({ label, link, icon }) => (
          <ListItem component={Link} to={`/dashboard${link}`} key={link} button>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  navDrawerOpen: PropTypes.bool,
};

export default withStyles(styles)(MiniDrawer);
