import { Button } from '@/components/common/form';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import history from '@/utils/history';

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
    color: '#08BAF7',
  },
  btnDiv: {
    textAlign: 'center',
  },
  align: {
    textAlign: 'center',
  },
  link: {
    color: '#2f80ed',
  },
  btn: {
    marginTop: 21,
  },
  span: {
    textAlign: 'center',
  },
});

const NotFound = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <Box fontSize={150} m={1}>
              404
            </Box>
          }
        />
        <CardContent className={classes.span}>
          <span className={classes.span}>¡La página que buscas no está disponible!</span>
        </CardContent>
        <CardContent>
          <Button onClick={() => history.goBack()}>REGRESAR</Button>
        </CardContent>
      </Card>
    </div>
  );
};

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
