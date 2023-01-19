import { Calendar } from '@/components/common/form/Calendar';
import useReservationStore from '@/stores/reservationStore';
import { FILTER_TYPES } from '@/utils/constant';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Form, Formik } from 'formik';
import React, { useEffect, useMemo } from 'react';

const DateFilter = () => {
  const { currentFilter, filterRes } = useReservationStore((state) => ({
    currentFilter: state.currentFilter,
    filterRes: state.filterRes,
  }));
  const showReset = useMemo(() => currentFilter === FILTER_TYPES.DATE, [currentFilter]);

  useEffect(() => {
    if (currentFilter !== FILTER_TYPES.NONE && currentFilter !== FILTER_TYPES.DATE) {
      filterRes(FILTER_TYPES.NONE);
    }
  }, [currentFilter]);

  const handleChange = (values) => {
    filterRes(FILTER_TYPES.DATE, values);
  };

  return (
    <div>
      <Formik
        initialValues={{
          startDate: '',
          endDate: '',
        }}
        onSubmit={handleChange}
      >
        <Form>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={12} md={4}>
              <Calendar name="startDate" label="Fecha inicial" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Calendar name="endDate" label="Fecha final" />
            </Grid>
            <Grid item container xs={12} md={4}>
              <Button size={'small'} type={'submit'}>
                Aplicar
              </Button>
              <Button
                style={{ visibility: showReset ? 'unset' : 'hidden' }}
                size={'small'}
                variant={'text'}
                onClick={() => {
                  filterRes(FILTER_TYPES.NONE);
                }}
              >
                Restablecer
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

export default DateFilter;
