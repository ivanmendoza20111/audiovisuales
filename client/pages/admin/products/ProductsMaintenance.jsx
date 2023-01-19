import { addProduct, editProduct, getProductById } from '@/api/product';
import { Button, DropDown, NumberField, TextField } from '@/components/common/form';
import CustomizedSnackbar from '@/components/common/snakebar/CustomizedSnackbar';
import useMode from '@/hooks/useMode';
import useProductTypeStore from '@/stores/productTypeStore';
import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const styles = () => ({
  root: {
    width: '80%',
    height: 'auto',
    top: '15%',
    margin: '0 auto',
  },
  divider: {
    margin: '20px auto',
  },
});

const ProductsMaintenance = ({ classes }) => {
  const { title, submitLabel, handleSubmit, initialData, error } = useMode({
    type: 'Producto',
    onAdd: addProduct,
    onEdit: editProduct,
    fetchById: getProductById,
    error,
    redirectTo: '/dashboard/productos',
  });

  const { productType, fetchAllProductType } = useProductTypeStore((state) => state);

  useEffect(() => {
    fetchAllProductType();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {error && <CustomizedSnackbar variant="error" className={classes.margin} message={error} />}
      <Divider className={classes.divider} />
      <Formik
        initialValues={
          initialData || {
            name: '',
            brand: '',
            typeId: '',
            stock: '',
          }
        }
        validate={validateProduct}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField label={'Producto'} name={'name'} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label={'Marca'} name={'brand'} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NumberField label={'Cantidad'} name={'stock'} />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <DropDown label={'Categoria'} name={'typeId'} items={productType} />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button name={'save'} type={'submit'} disabled={isSubmitting}>
                    {submitLabel}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const validateProduct = (values) => {
  const errors = {};
  const requiredFields = ['name', 'brand', 'product_type_id', 'stock'];
  requiredFields.forEach((field) => {
    if (values[field] === '') {
      errors[field] = 'Este campo es requerido.';
    } else if (field === 'stock' && values[field] < 1) {
      errors[field] = 'Debe ser mayor de cero.';
    }
  });

  return errors;
};

ProductsMaintenance.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default withStyles(styles)(ProductsMaintenance);
