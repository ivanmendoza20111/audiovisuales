import useAssistantStore from '@/stores/assistantStore';
import { SHORT_DATE_FORMAT } from '@/utils/constant';
import moment from 'moment';

export const dateFormat = (date) => moment(date).locale('es').format('hh:mm a,  DD/MM/YYYY');

const dateFormatterLLL = (date) => moment(date).locale('es').format('lll');

export const dateFormatterLL = (date) => moment(date).locale('es').format('ll');

const dateShortFormatter = (date) => moment(date).format(SHORT_DATE_FORMAT);

const phoneNumberFormatter = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const initialCode = match[1] ? '+1 ' : '';

    return [initialCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }

  return null;
};

const durationFormatter = (duration) =>
  Math.floor(duration / 60) + ' h ' + (duration % 60) + ' min';

const formatMap = {
  date: (date) => dateFormatterLLL(date),
  date_end: (date) => dateFormatterLL(date),
  date_ini: (date) => dateFormatterLL(date),
  fromDate: (date) => dateShortFormatter(date),
  toDate: (date) => dateShortFormatter(date),
  birthday: (date) => dateFormatterLL(date),
  release_date: (date) => dateFormatterLL(date),
  duration: (duration) => durationFormatter(duration),
  totalPrice: (price) => price,
  price: (price) => price,
  phone: (phoneNumber) => phoneNumberFormatter(phoneNumber),
  status_prom: (status) => (status === '1' ? 'Activo' : 'Inactivo'),
  sex_id: (sexId) => (sexId === 1 ? 'M' : 'F'),
  isActive: (status) => (status === 1 ? 'Activo' : 'Cancelado/Removido'),
  assistantId: (id) => {
    if (id) {
      const assistant = useAssistantStore.getState().getAssistantById(id);
      if (assistant) return assistant.username;
    }

    return 'No asignado.';
  },
  description: (movieDescription) => `${movieDescription.substring(0, 200)}...`,
};

export const formatData = ({ value, key }) => {
  const formatter = formatMap[key];
  if (formatter) {
    return formatter(value);
  }

  return value;
};
