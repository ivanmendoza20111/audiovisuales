import {
  DATE_FORMAT_YYYY_MM_DD,
  DAYS,
  GENERIC_WORD_REGULAR_EXPRESSION,
  PROFESSOR_REGULAR_EXPRESSION,
  STUDENT_REGULAR_EXPRESSION,
} from '@/utils/constant';
import { dateFormatterLL } from '@/utils/format';
import { generateAvailableDateToReservate } from '@/utils/generateAvailableDateToReservate';
import moment from 'moment';
import * as Yup from 'yup';

const availableDateToSchedule = generateAvailableDateToReservate();
const dateFormatted = dateFormatterLL(availableDateToSchedule);

Yup.addMethod(Yup.date, 'minAvailableDate', function (errorMessage) {
  return this.test('min-available-date', errorMessage, function (date) {
    const { path, createError } = this;
    const dateSelected = moment(date).format(DATE_FORMAT_YYYY_MM_DD);
    const dateAvailable = moment(availableDateToSchedule).format(DATE_FORMAT_YYYY_MM_DD);
    const isADateBefore = moment(dateSelected).isSameOrAfter(dateAvailable);

    return isADateBefore || createError({ path, message: errorMessage });
  });
});

Yup.addMethod(Yup.date, 'sameScheduleDay', function (errorMessage) {
  return this.test('same-schedule-day', errorMessage, function (date) {
    const { path, createError, parent } = this;
    const dateSelected = moment(date).format(DATE_FORMAT_YYYY_MM_DD);
    const scheduleDay = DAYS.findIndex((value) => parent.schedule?.day === value);
    const isSameScheduleDay = moment(dateSelected).day() === scheduleDay;

    return isSameScheduleDay || createError({ path, message: errorMessage });
  });
});

export const ReservationAudiovisualEquipmentSchema = Yup.object().shape({
  schedule: Yup.object()
    .required('Debe de seleccionar un horario para reservar los equipos audiovisuales')
    .nullable(),
  scheduleDay: Yup.date()
    .required('Debe de seleccionar una fecha')
    .typeError('Por favor ingrese una hora valida')
    .minAvailableDate(`Debe de seleccionar una fecha después del ${dateFormatted}`)
    .sameScheduleDay('Debe de seleccionar una fecha que coincida con el dia de la asignatura.'),
  career: Yup.string()
    .min(6, 'Cantidad mínima de carácteres: 6')
    .max(50, 'Cantidad máxima de carácteres: 50')
    .required('Debe de proporcionar la carrera a la que pertenece'),
  classroom: Yup.string()
    .max(4, 'Debe de ingresar una aula válida, Ejemplo: A101')
    .min(4, 'Debe de ingresar una aula válida, Ejemplo: A101'),
  name: Yup.string()
    .matches(
      GENERIC_WORD_REGULAR_EXPRESSION,
      'Debe de ingresar un nombre válido, Ejemplo: John Doe'
    )
    .min(3, 'Cantidad mínima de carácteres: 3')
    .max(20, 'Cantidad máxima de carácteres: 20')
    .required('Debe de proporcionar su nombre'),
  code: Yup.string()
    .required('Debe de proporcionar su código/matrícula')
    .when('requester', {
      is: '1',
      then: Yup.string()
        .matches(
          STUDENT_REGULAR_EXPRESSION,
          'Debe de ingresar una matrícula estudiantil válida, Ejemplo: 1-01-0001'
        )
        .max(9, 'Debe de ingresar una matrícula estudiantil válida, Ejemplo: 1-01-0001')
        .min(9, 'Debe de ingresar una matrícula estudiantil válida, Ejemplo: 1-01-0001')
        .required('Debe de proporcionar su matrícula'),
    })
    .when('requester', {
      is: '2',
      then: Yup.string()
        .matches(
          PROFESSOR_REGULAR_EXPRESSION,
          'Debe de ingresar una código de docente válido, Ejemplo: ISC001'
        )
        .min(6, 'Debe de ingresar una código de docente válido, Ejemplo: ISC001')
        .max(6, 'Debe de ingresar una código de docente válido, Ejemplo: ISC001')
        .required('Debe de proporcionar su código'),
    }),
  email: Yup.string()
    .email('Debe de proporcionar un email válido, Ejemplo: alumno@alumno.utesa.edu')
    .required('Debe de proporcionar un email')
    .max(30, 'Cantidad máxima de carácteres: 30'),
  phone: Yup.string().required('Debe de proporcionar un teléfono'),
  professor: Yup.string().matches(
    GENERIC_WORD_REGULAR_EXPRESSION,
    'Debe de ingresar un nombre válido, Ejemplo: John Doe'
  ),
  equipment: Yup.object().shape({
    Projector: Yup.boolean(),
    Laptop: Yup.boolean(),
    Sound: Yup.boolean(),
  }),
  proffesorCode: Yup.string().matches(
    PROFESSOR_REGULAR_EXPRESSION,
    'Debe de ingresar una código de docente válido, Ejemplo: ISC001'
  ),
  subject: Yup.string(),
  requester: Yup.string(),
});
