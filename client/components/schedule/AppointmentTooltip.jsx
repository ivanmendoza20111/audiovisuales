import { Card, CardContent, makeStyles, ListItemText, Typography } from '@material-ui/core';
import { Button } from '@/components/common/form/Button';
import useAssistantStore from '@/stores/assistantStore';
import PropTypes from 'prop-types';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  image: {
    height: 127,
    width: 200,
  },
  root: {
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  cancelText: {
    color: '#ccba32',
  },
  tooltip: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
}));

const AppointmentTooltip = ({ data, cancelAppointment, scheduleRef }) => {
  const classes = useStyles();
  const { products, userClassroom, assistantId, userName, fromDate, toDate } = data.appointmentData;
  const { getAssistantById, getFullName } = useAssistantStore(
    ({ getAssistantById, getFullName }) => ({ getAssistantById, getFullName })
  );
  const assistant = assistantId ? getAssistantById(assistantId) : null;
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    scheduleRef.current.instance.hideAppointmentTooltip();
    Swal.fire({
      title: '¿Esta seguro que desea cancelar esta reservación?',
      text: 'Cuando afirme, se enviara un correo al solicitante avisándole sobre la cancelación.',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelAppointment(data.appointmentData);
      } else {
        setIsLoading(false);
      }
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.bold}>
          Aula {userClassroom} | {moment(fromDate).format('h:mm a')}
          {' - '}
          {moment(toDate).format('h:mm a')}
        </Typography>
        <Typography className={classes.bold}>Solicitante:</Typography>
        <Typography>{userName}</Typography>
        <Typography className={classes.bold}>Productos:</Typography>
        {products.map(({ name, type, brand }) => (
          <ListItemText
            key={`product-${type}-${name}-${brand}`}
            primary={`${type} ${name}`}
            secondary={brand}
          />
        ))}
        <Typography className={classes.bold}>Auxiliar:</Typography>
        <Typography>{assistant ? getFullName(assistant) : 'No asignado'}</Typography>
        <br />
        {data.appointmentData.isActive ? (
          <Button color={'primary'} onClick={handleCancel} disabled={isLoading}>
            Cancelar reservación
          </Button>
        ) : (
          <Typography color="textSecondary">Reservación cancelada</Typography>
        )}
      </CardContent>
    </Card>
  );
};

AppointmentTooltip.propTypes = {
  data: PropTypes.object.isRequired,
  cancelAppointment: PropTypes.func.isRequired,
  scheduleRef: PropTypes.any.isRequired,
};

export default AppointmentTooltip;
