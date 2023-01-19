import FooterPublic from '@/components/common/footer/FooterPublic';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    width: '100%',
    minHeight: '100%',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

const PublicLayout = (props) => {
  const { classes, children } = props;

  return (
    <div className={classes.root}>
      <main className={classes.content}>{children}</main>
      <FooterPublic />
    </div>
  );
};

PublicLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element,
};

export default withStyles(styles)(PublicLayout);
