import ReservationForm from '@/components/audiovisual-equipment/ReservationForm';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    width: '120px',
    marginTop: '30px',
  },
  figure: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '25px',
    color: theme.palette.text.secondary,
  },
}));

export default function ReservationAudiovisualEquipment() {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <Container>
        <figure className={classes.figure}>
          <img src={'/img/logo.png'} alt="Logo de UTESA" className={classes.logo} />
        </figure>
        <Typography className={classes.title}>
          Formulario de Servicios Audiovisuales (UTESA)
        </Typography>
        <ReservationForm />
      </Container>
    </Paper>
  );
}
