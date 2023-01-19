import { Button } from '@/components/common/form';
import useModalStore from '@/stores/modalStore';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import ModalMaterialUI from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '45%',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  title: {
    fontSize: '35px',
    marginBottom: '30px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  note: {
    marginTop: '15px',
    fontWeight: 'bold',
  },
  button: {
    width: '50%',
    marginTop: '30px',
    display: 'flex',
  },
  anchorTag: {
    color: theme.palette.color.black,
    fontWeight: 'bold',
  },
  infoContact: {
    marginTop: '20px',
  },
}));

export default function Modal() {
  const classes = useStyles();
  const { openModal, toggleModal } = useModalStore((state) => state);

  return (
    <div>
      <ModalMaterialUI
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={toggleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <Typography component={'h1'} className={classes.title} id="transition-modal-title">
              Audiovisuales y Multimedia
            </Typography>
            <Container>
              <Typography id="transition-modal-description">
                Este formulario se completa aproximadamente en 7 minutos. Uso interno institucional.
              </Typography>
              <ul>
                <li>Para llenar este formulario, debe tener el correo institucional activo.</li>
                <li>Los servicios se trabajarán por orden de llegada.</li>
              </ul>
              <Typography>
                La universidad tecnológica de Santiago, Utesa, garantiza el respeto a la intimidad y
                dignidad en los datos personales.
              </Typography>
              <Typography className={classes.infoContact}>
                Para mayor información comunicarse al{' '}
                <a href="tel:+18095827156,262" className={classes.anchorTag}>
                  (809)-582-7156 ext 262
                </a>
                . Correo electrónico:{' '}
                <a href="mailto:adamtburdo@utesa.edu" className={classes.anchorTag}>
                  adamtburdo@utesa.edu
                </a>
              </Typography>
              <Typography className={classes.note}>
                Nota: Este formulario debe ser entregado con siete (7) días de anticipación.
              </Typography>
              <Button onClick={toggleModal} className={classes.button}>
                Cerrar
              </Button>
            </Container>
          </div>
        </Fade>
      </ModalMaterialUI>
    </div>
  );
}
