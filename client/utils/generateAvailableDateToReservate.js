import { dateFormat } from '@/utils/format';
import moment from 'moment';

export const generateAvailableDateToReservate = () => {
  return new moment().add(7, 'day');
};

export const updateDateTimeReservateInput = ({ date, hour }) => {
  const dateSelected = moment(date).format('YYYY-MM-DD');
  const hourSelected = moment(hour).format('hh:mm a');

  return dateFormat(`${dateSelected} ${hourSelected}`);
};
