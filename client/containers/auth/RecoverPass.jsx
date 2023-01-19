import { forgotPassword } from '@/api/forgotPassword';
import { Button, CheckBox, EmailField } from '@/components/common/form';
import CustomizedSnackbar from '@/components/common/snakebar/CustomizedSnackbar';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const RecoverSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('Requerido'),
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
  checkbox: {
    justifyContent: 'center',
  },
});

const RecoverPassForm = ({ classes, errorMessage }) => {
  const handleSubmit = async (values) => {
    const userEmail = {
      email: values.email,
    };

    forgotPassword(userEmail)
      .then(() => {
        Swal.fire({
          showConfirmButton: true,
          icon: 'success',
          text: 'Revise su email, se le ha enviado un enlace para crear su nueva contraseña',
        });
      })
      .catch(() => {
        Swal.fire({
          showConfirmButton: true,
          icon: 'error',
          text: 'Ha habido un error al intentar enviar los datos,comprueba el correo introducido o vuelva a intentarlo mas tarde',
        });
      });
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
            initialValues={{ email: '' }}
            validationSchema={RecoverSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <EmailField name="email" placeholder="Correo electrónico" />
                  </Grid>
                </Grid>
                <CheckBox
                  labelClassName={classes.checkbox}
                  name="terms"
                  label="Acepto las Políticas de privacidad"
                />
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

RecoverPassForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(RecoverPassForm);
