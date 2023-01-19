import useAssistantStore from '@/stores/assistantStore';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';

const Appointment = ({ data }) => {
  const {
    targetedAppointmentData: {
      assistantId,
      userClassroom,
      products,
      displayStartDate,
      displayEndDate,
      userName,
    },
  } = data;
  const { getAssistantById, getFullName } = useAssistantStore(
    ({ getAssistantById, getFullName }) => ({ getAssistantById, getFullName })
  );
  const assistant = assistantId ? getAssistantById(assistantId) : null;

  return (
    <div className={'showtime-preview'}>
      <Typography>Aula: {userClassroom}</Typography>
      <Typography>Productos:</Typography>
      <span>
        {products.map(
          (
            { type, brand },
            i // TODO: Use product id for key
          ) => (
            <ListItemText key={`${type} ${brand} ${i}`} primary={`- ${type}`} />
          )
        )}
      </span>
      <Typography>Solicitante: {userName}</Typography>
      <Typography>Auxiliar: {assistant ? getFullName(assistant) : 'No asignado.'}</Typography>
      <Typography>
        {moment(displayStartDate).format('h:mm a')}
        {' - '}
        {moment(displayEndDate).format('h:mm a')}
      </Typography>
    </div>
  );
};

Appointment.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Appointment;
