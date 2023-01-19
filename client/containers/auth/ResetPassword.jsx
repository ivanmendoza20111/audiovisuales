import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, PasswordField } from '@/components/common/form';
import CustomizedSnackbar from '@/components/common/snakebar/CustomizedSnackbar';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { updatePassword } from '@/api/resetPassword';
import Swal from 'sweetalert2';
import { regExPassword } from '@/shared/utils';

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,16}$/,
      'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra en minúscula, una en mayúscula y un número'
    )
    .required('Requerido'),
  confirmPassWord: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Las contraseñas deben coincidir'
  ),
});

const styles = (theme) => ({
  root: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'relative',
    padding: '10% 0',
    margin: 'auto',
  },
  card: {
    backgroundColor: theme.palette.background.default,
    padding: 20,
    overflow: 'auto',
    borderRadius: 16,
  },
  cardHeader: {
    textAlign: 'center',
  },
  headerImg: {
    width: 91.43,
    height: 67.84,
  },
  btnDiv: {
    textAlign: 'center',
  },
  align: {
    textAlign: 'center',
  },
  link: {
    color: '#2f80ed',
  },
  btn: {
    marginTop: 21,
  },
});

const ResetPassword = ({ props, classes, errorMessage }) => {
  const { search } = useLocation();
  const history = useHistory();
  const [isError, setIsError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    const userPassword = {
      password: values.password,
    };

    if (!regExPassword.test(userPassword.password)) {
      Swal.fire({
        showConfirmButton: true,
        icon: 'error',
        text: 'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra en minúscula, una en mayúscula y un número',
      });
      return;
    }

    const query = new URLSearchParams(search);
    const id = query.get('id');
    const token = query.get('token');
    const data = { password: userPassword.password, reset_password_token: token, id: id };

    await updatePassword(data, id)
      .then((res) => {
        Swal.fire({
          showConfirmButton: true,
          icon: 'success',
          text: 'Contraseña cambiada correctamente',
        });
        history.push('/login');
      })
      .catch((err) => {
        Swal.fire({
          showConfirmButton: true,
          icon: 'error',
          text: 'Ha habido un error al intentar enviar los datos, vuelva a intentarlo más tarde',
        });
      });
  };

  const switchShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <img className={classes.headerImg} src="/img/logo.png" alt={'Caribbean Cinema Logo'} />
          }
        />
        {errorMessage && (
          <CustomizedSnackbar variant="error" className={classes.margin} message={errorMessage} />
        )}
        <CardContent>
          <Formik
            initialValues={{ password: '', confirmPassWord: '' }}
            // eslint-disable-next-line no-unused-vars
            onSubmit={handleSubmit}
            validationSchema={ResetSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <PasswordField
                      name="password"
                      label="Contraseña"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {/* <Button onClick={switchShowPassword}>
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </Button> */}
                    <PasswordField name="confirmPassWord" label="Confirmar Contraseña" />
                    <div className="confirmPassword">{isError}</div>
                  </Grid>
                </Grid>
                <Button type="submit" disabled={isSubmitting}>
                  Enviar
                </Button>

                <br />
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};
ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
export default withStyles(styles)(ResetPassword);
