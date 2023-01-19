import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

export const AUXILIAR_ROLE_ID = 1;
export const RESERVATION_ACTIVE_COLOR = '#0b8043';
export const RESERVATION_REJECTED_COLOR = '#e67c73';
export const RESERVATION_PROGRESS_COLOR = '#70caee';
export const FILTER_TYPES = {
  NEXT: 'nextToStart',
  IN_PROGRESS: 'inProgress',
  FINISHED: 'finished',
  DATE: 'date',
  REJECTED: 'rejected',
  NONE: 'none',
};
export const NEXT_IN_MINUTES = 30;
export const SHORT_DATE_FORMAT = 'DD/MM/YY hh:mm A';
export const STUDENT_REGULAR_EXPRESSION = /^[1-9]{1}-[0-9]{2}-[0-9]{4}$/;
export const PROFESSOR_REGULAR_EXPRESSION = /[A-Z]{3}\d{3}/;
export const CLASSROOM_REGULAR_EXPRESSION = /^[A-D][1-5][1-30]/;
export const GENERIC_WORD_REGULAR_EXPRESSION = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
export const SOCIAL_MEDIA_LINKS = [
  { Icon: FacebookIcon, link: 'https://www.facebook.com/utesasedesantiago' },
  { Icon: InstagramIcon, link: 'https://www.instagram.com/utesasede' },
  { Icon: TwitterIcon, link: 'https://twitter.com/UTESA' },
];
export const NOT_USER_DATA_FOUND_MESSAGE =
  'Ha ocurrido un error al momento de obtener sus datos, recomendamos que se comunique con el departamento de audiovisuales.';
export const RESERVATION_ERROR_MESSAGE =
  'Lamentablemente no se ha podido reservar los equipos audiovisuales seleccionados, recomendamos que se comunique con el departamento de audiovisuales.';
export const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD';
export const DATE_FORMAT_LONG = 'YYYY-MM-DD HH:mm:ss a';
export const DAYS = ['Domingos', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados'];
