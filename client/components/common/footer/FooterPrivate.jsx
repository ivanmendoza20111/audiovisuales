import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => ({
  legal: {
    position: 'static',
    bottom: 0,
    width: '97.6%',
    padding: '15px',
    overflow: 'hidden',
  },
});
const FooterPrivate = (props) => {
  const { classes } = props;

  return (
    <div className={classes.legal}>
      <div className="copyright">© Caribbean Cinema, 2022. Creado por LICEM 🔥</div>
    </div>
  );
};

FooterPrivate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterPrivate);
