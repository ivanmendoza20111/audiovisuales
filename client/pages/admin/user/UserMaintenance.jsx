import { addUser, editUser, getUserById, updatePassword } from '@/api/user';
import {
  Button,
  Calendar,
  DropDown,
  EmailField,
  PasswordField,
  PhoneField,
  TextField,
} from '@/components/common/form';
import CustomizedSnackbar from '@/components/common/snakebar/CustomizedSnackbar';
import useRoleStore from '@/stores/roleStore';
import useMode from '@/hooks/useMode';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { regExPassword } from '@/shared/utils';
import { useEffect } from 'react';

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(20, 'Inserte un máximo de 20 caracteres')
    .required('Requerido'),
  surname: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(30, 'Inserte un máximo de 30 caracteres')
    .required('Requerido'),
  username: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(15, 'Inserte un máximo de 15 caracteres')
    .required('Requerido'),
  birthday: Yup.date().required('Requerido'),
  email: Yup.string().email('Email invalido').required('Requerido'),
  isEditMode: Yup.boolean(),
  phone: Yup.string()
    .matches(
      /^((\+|)1)*( )*(?![0-9]{3}\))(\((?=[0-9]{3}\)))*[0-9]{3}\)*( |-)?[0-9]{3}( |-)?[0-9]{4}\b/,
      'Formato invalido'
    )
    .required('Requerido'),
  password: Yup.string().when('isEditMode', {
    is: false,
    then: Yup.string().matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,16}$/,
      'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra en minúscula, una en mayúscula y un número'
    ),
    otherwise: Yup.string(),
  }),
  passwordConfirmation: Yup.string().when('isEditMode', {
    is: false,
    then: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Requerido'),
    otherwise: Yup.string(),
  }),
  roleId: Yup.mixed().oneOf(['0', '1']).required('Requerido'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    height: 'auto',
    top: '15%',
    margin: '0 auto',
    padding: 30,
    backgroundColor: theme.palette.background.form,
  },
  card: {
    backgroundColor: theme.palette.background.default,
    padding: 20,
    overflow: 'auto',
  },
  divider: {
    margin: '20px auto',
  },
  btn: {
    maxWidth: 180,
    marginTop: 80,
  },
}));

const UserMaintenance = () => {
  const classes = useStyles();
  const { isEditMode, title, submitLabel, handleSubmit, initialData, error, id } = useMode({
    type: 'Usuario',
    onAdd: addUser,
    onEdit: editUser,
    error,
    redirectTo: '/dashboard/usuario',
    fetchById: getUserById,
    removeValues: ['passwordConfirmation', 'isEditMode'],
  });

  const { role, fetchAllRole } = useRoleStore((state) => state);

  useEffect(() => {
    fetchAllRole();
  }, []);

  const newInitialData = initialData
    ? {
        ...initialData,
        isEditMode,
        ...(!isEditMode && { password: '', passwordConfirmation: '' }),
      }
    : null;

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {error && <CustomizedSnackbar variant="error" className={classes.margin} message={error} />}
      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={isEditMode ? 6 : 12}>
          <Formik
            initialValues={
              newInitialData || {
                name: '',
                surname: '',
                username: '',
                email: '',
                birthday: '',
                phone: '',
                isEditMode: isEditMode,
                roleId: '1',
                password: '',
                passwordConfirmation: '',
                ...(!isEditMode && { password: '', passwordConfirmation: '' }),
              }
            }
            validationSchema={UserSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <Card className={classes.card}>
                  <CardHeader className={classes.cardHeader} title={'Detalles'} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <TextField name="username" label={'Usuario'} />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <DropDown name="roleId" items={role} label="Rol" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <EmailField name="email" label="Email" />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField name="name" label="Nombre" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField name="surname" label="Apellido" />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Calendar name="birthday" label="Fecha de nacimiento" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <PhoneField name="phone" label="Teléfono" />
                    </Grid>
                  </Grid>
                  {isEditMode ? null : (
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <PasswordField name="password" label="Contraseña" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <PasswordField name="passwordConfirmation" label="Confirmar Contraseña" />
                      </Grid>
                    </Grid>
                  )}
                  <Grid container>
                    <Grid item className={classes.btn}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={isSubmitting}
                      >
                        {submitLabel}
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>

        {isEditMode ? <PasswordUpdate id={id} /> : null}
      </Grid>
    </div>
  );
};

const PasswordUpdate = ({ id, errorMessage }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleSubmit = async (values) => {
    const { password, oldPassword, passwordConfirmation } = values;

    if (!regExPassword.test(password)) {
      Swal.fire({
        showConfirmButton: true,
        icon: 'error',
        text: 'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra en minúscula, una en mayúscula y un número',
      });

      return;
    }

    if (passwordConfirmation !== password) {
      errorMessage = 'Las contraseñas no coinciden';

      return;
    }
    if (oldPassword === password) {
      errorMessage = 'La nueva contraseña no puede ser igual a la anterior';

      return;
    }

    const data = { password: password, oldPassword: oldPassword, id: id };

    await updatePassword(data, id)
      .then(() => {
        Swal.fire({
          showConfirmButton: true,
          icon: 'success',
          text: 'Contraseña cambiada correctamente',
        });
        history.push('/dashboard');
      })
      .catch(() => {
        errorMessage = 'La "Antigua Contraseña" es incorrecta.';
      });
  };

  return (
    <Grid item xs={12} md={6}>
      <Formik
        initialValues={{ drop_down_zone: '' }}
        validateSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Card className={classes.card}>
              {errorMessage && <CustomizedSnackbar variant="error" message={errorMessage} />}
              <CardHeader className={classes.cardHeader} title={'Cambiar Contraseña'} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <PasswordField name={'oldPassword'} label={'Antigua Contraseña'} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <PasswordField name={'password'} label={'Nueva Contraseña'} />{' '}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <PasswordField
                    name={'passwordConfirmation'}
                    label={'Confirmar Nueva Contraseña'}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Cambiar
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

UserMaintenance.propTypes = {
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

PasswordUpdate.propTypes = {
  id: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default UserMaintenance;
