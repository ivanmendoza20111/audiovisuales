import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    backgroundImage: 'url(/img/background.png)',
    backgroundSize: 'cover',
  },
};

const EmptyLayout = (props) => {
  const { classes, children } = props;

  return (
    <div className={classes.root}>
      <main>{children}</main>
    </div>
  );
};

EmptyLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element,
};

export default withStyles(styles)(EmptyLayout);
