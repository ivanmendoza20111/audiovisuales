import { DATE_FORMAT_LONG, DATE_FORMAT_YYYY_MM_DD } from '@/utils/constant';
import moment from 'moment/moment';

export const getReservationDateRange = ({ date, startHour, endHour }) => {
  const dateParsed = moment(date).format(DATE_FORMAT_YYYY_MM_DD);
  const generateDateWithHour = (hour) => {
    return moment(`${dateParsed} ${hour}`, DATE_FORMAT_LONG).format(DATE_FORMAT_LONG);
  };

  return {
    startHour: generateDateWithHour(startHour),
    endHour: generateDateWithHour(endHour),
  };
};
