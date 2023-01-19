import {
  Button,
  Calendar,
  CheckBox,
  EmailField,
  PhoneField,
  TextField,
} from '@/components/common/form';
import { useQuery } from '@/hooks/useQuery';
import { ReservationAudiovisualEquipmentSchema } from '@/schemas/reservationAudiovisualEquipment.schema';
import useModalStore from '@/stores/modalStore';
import useReservationStore from '@/stores/reservationStore';
import useUserDataStore from '@/stores/userDataStore';
import { generateAvailableDateToReservate } from '@/utils/generateAvailableDateToReservate';
import { swalError } from '@/utils/swal';
import { FormLabel, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { Form, Formik } from 'formik';
import jwt from 'jsonwebtoken';
import { Fragment, useEffect, useState } from 'react';

const availableDateToReservation = generateAvailableDateToReservate();

const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    display: 'flex',
    paddingLeft: '0px',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: '5px',
    marginLeft: '10px',
    marginTop: '0px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  terms: {
    justifyContent: 'center',
  },
  relevantInformation: {
    color: theme.palette.color.darkGreenX11,
    cursor: 'pointer',
  },
  submitButton: {
    width: '50%',
    display: 'flex',
  },
}));

const RelevantInformation = () => {
  const classes = useStyles();
  const { toggleModal } = useModalStore((state) => state);

  return (
    <Typography>
      He revisado{' '}
      <span className={classes.relevantInformation} onClick={toggleModal}>
        Información relevante para llevar este formulario
      </span>
    </Typography>
  );
};

const isDisabled = (values) => {
  return (
    !values.terms ||
    (!values.equipment.Projector && !values.equipment.Laptop && !values.equipment.Sound)
  );
};
export default function ReservationForm() {
  const query = useQuery();
  const [credentials, setCredentials] = useState({
    userType: '',
    id: '',
  });
  const {
    userData,
    fetchUserData,
    errorUserData: errorUserData,
  } = useUserDataStore((state) => state);
  const { store: addReservation } = useReservationStore((state) => state);
  const classes = useStyles();

  const disableAutocomplete = errorUserData || !userData.schedule;
  const isAStudent = credentials.userType === 'students';

  const setUserCredentials = () => {
    const token = query.get('token');
    const credentials = jwt.decode(token) || {
      userType: '',
      id: '',
    };
    fetchUserData(credentials);
    setCredentials(credentials);
  };

  useEffect(() => {
    try {
      setUserCredentials();
    } catch (e) {
      swalError();
    }
  }, []);

  const onSubmit = async (values, { resetForm }) => {
    await addReservation({
      ...values,
      requester: isAStudent ? 'Estudiante' : 'Docente',
    });
    resetForm();
  };

  const setCustomValues = ({ setFieldValue, value }) => {
    const classroom = value ? value.classroom : '';
    const professor = value ? value.professor : '';
    const proffesorCode = value ? value.proffesorCode : '';
    setFieldValue('classroom', classroom);
    setFieldValue('professor', professor);
    setFieldValue('proffesorCode', proffesorCode);
  };

  return (
    <Fragment>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{
          ...userData,
          schedule: userData.schedule.length ? userData.schedule[0] : {},
          ...(isAStudent && { profName: '', profCode: '' }),
        }}
        validationSchema={ReservationAudiovisualEquipmentSchema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Autocomplete
                  disabled={disableAutocomplete}
                  id="grouped-demo"
                  getOptionSelected={(option, value) =>
                    JSON.stringify(option) === JSON.stringify(value)
                  }
                  options={userData.schedule}
                  groupBy={(option) => option.subject}
                  getOptionLabel={(option) => option.schedule}
                  style={{ width: 'auto' }}
                  onChange={(event, value) => {
                    setFieldValue('schedule', value);
                    setCustomValues({ setFieldValue, value });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Horario" variant="outlined" name={'schedule'} />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="legend" className={classes.label}>
                  Equipos *
                </FormLabel>
                <Container className={classes.checkboxContainer}>
                  <CheckBox name="equipment.Projector" label="Proyector" disabled={errorUserData} />
                  <CheckBox name="equipment.Laptop" label="Laptop" disabled={errorUserData} />
                  <CheckBox name="equipment.Sound" label="Sonido" disabled={errorUserData} />
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="legend" className={classes.label}>
                  Fecha *
                </FormLabel>
                <Calendar
                  name={'scheduleDay'}
                  minDate={availableDateToReservation}
                  disabled={errorUserData}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend" className={classes.label}>
                  Datos del solicitante *
                </FormLabel>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Nombre'} name={'name'} disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Matrícula/Código'} name={'code'} disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Carrera'} name={'career'} disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Aula'} name={'classroom'} disabled={errorUserData} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <EmailField label={'Correo'} name={'email'} disabled={errorUserData} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PhoneField label={'Teléfono'} name={'phone'} disabled={errorUserData} />
                  </Grid>
                </Grid>
              </Grid>
              {isAStudent ? (
                <Grid item xs={12}>
                  <FormLabel component="legend" className={classes.label}>
                    Datos del docente *
                  </FormLabel>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField label={'Nombre'} name={'professor'} disabled />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField label={'Código'} name={'proffesorCode'} disabled />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
            <Grid container className={classes.buttonContainer}>
              <Grid item xs={12} md={7}>
                <CheckBox
                  labelClassName={classes.terms}
                  name="terms"
                  label={<RelevantInformation />}
                />
                <Button
                  className={classes.submitButton}
                  name={'save'}
                  type={'submit'}
                  disabled={errorUserData || isDisabled(values)}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}
