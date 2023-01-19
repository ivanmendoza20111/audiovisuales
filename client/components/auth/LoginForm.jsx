import { Button, CheckBox, EmailField, PasswordField } from '@/components/common/form';

import CustomizedSnackbar from '@/components/common/snakebar/CustomizedSnackbar';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('Requerido'),
  password: Yup.string().required('Por favor, ingresa tu contraseña'),
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
    height: 91.43,
  },
  btnDiv: {
    textAlign: 'center',
  },
  align: {
    textAlign: 'center',
  },
  link: {
    color: theme.palette.text.secondary,
  },
  btn: {
    marginTop: 21,
  },
});

const LoginForm = ({ handleSubmit, classes, errorMessage }) => {
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
            initialValues={{ email: '', password: '', remindMe: false }}
            validationSchema={LoginSchema}
            // eslint-disable-next-line no-unused-vars
            onSubmit={({ remindMe, ...values }) => handleSubmit(values)}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <EmailField name="email" label="Email" /> {/* TODO: Accept Username */}
                    <PasswordField name="password" label="Contraseña" />
                    <CheckBox
                      name="remindMe"
                      label="Recuérdame" // TODO: Remind Me Functionality
                    />
                  </Grid>
                </Grid>
                <Button type="submit" disabled={isSubmitting}>
                  Iniciar Sesión
                </Button>
                {/* <p className={classes.align}>
                  ¿No tiene una cuenta?{' '}      // COMENTADO POR DES USO
                  <Link className={classes.link} to={'/signup'}>
                    Crea una
                  </Link>
                </p> */}
                <br />
                <p className={classes.align}>
                  <Link className={classes.link} to={'/RecuperarContraseña'}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(LoginForm);
