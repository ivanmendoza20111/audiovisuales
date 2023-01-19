import { Button } from '@/components/common/form';
import history from '@/utils/history';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    minWidth: 320,
    maxWidth: 450,
    height: 'auto',
    position: 'relative',
    padding: '10% 0',
    margin: 'auto',
  },
  card: {
    backgroundColor: theme.palette.background.default,
    padding: 20,
    overflow: 'auto',
    borderRadius: 16,
  },
  cardHeader: {
    textAlign: 'center',
    color: '#2f80ed',
  },
  btnDiv: {
    textAlign: 'center',
  },
  align: {
    textAlign: 'center',
  },
  btn: {
    marginTop: 21,
  },
  span: {
    textAlign: 'center',
  },
  link: {
    color: 'white',
    '&:hover': { textDecoration: 'none', color: '#2f80ed' },
  },
});

const Error500 = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <Box fontSize={150} m={1}>
              500
            </Box>
          }
        />
        <CardContent className={classes.span}>
          <span className={classes.span}>¡Ha ocurrido un error!</span>
        </CardContent>
        <CardContent>
          <form>
            <Button onClick={() => history.goBack()}>REGRESAR</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

Error500.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error500);
