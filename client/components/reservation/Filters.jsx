import Button from '@material-ui/core/Button';
import useReservationStore from '@/stores/reservationStore';
import { FILTER_TYPES } from '@/utils/constant';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PropTypes from 'prop-types';
import React from 'react';

export const FILTER_DATA = [
  { label: 'Próximos', value: FILTER_TYPES.NEXT },
  { label: 'En progreso', value: FILTER_TYPES.IN_PROGRESS },
  { label: 'Finalizado', value: FILTER_TYPES.FINISHED },
  { label: 'Rechazados', value: FILTER_TYPES.REJECTED },
];

const useStyles = makeStyles((theme) => ({
  toggleGroup: {
    overflow: 'auto',
    border: '1px solid black',
    '& > div': {
      margin: '5px 0',
      padding: 3,
      '&:not(:first-child)': {
        borderLeft: '1px solid black !important',
      },
    },
  },
  toggleButton: {
    color: 'black',
    margin: '0',
    whiteSpace: 'nowrap',
    borderRadius: '16px !important',
    border: 'none',
    backgroundColor: theme.palette.background.default,
    '&:hover , &:focus': {
      transition: '0.5s',
      backgroundColor: theme.palette.background.greenBackground,
      color: '#ffffff !important',
    },
    '&.Mui-selected': {
      color: theme.palette.text.secondary,
    },
    '&::before': {
      content: '',
      borderLeft: '1px solid black !important',
    },
  },
  button: {
    margin: '0 auto',
    padding: 5,
    marginLeft: 10,
    fontSize: 14,
  },
}));

const CustomToggleButton = React.forwardRef((props, ref) => (
  <div>
    <ToggleButton ref={ref} {...props} />
  </div>
));

CustomToggleButton.propTypes = { props: PropTypes.object, ref: PropTypes.any };
CustomToggleButton.displayName = CustomToggleButton;

const Filters = () => {
  const classes = useStyles();
  const { currentFilter, filterRes } = useReservationStore((state) => ({
    currentFilter: state.currentFilter,
    filterRes: state.filterRes,
  }));

  const handleChange = (_, newValue) => {
    if (newValue !== currentFilter) {
      filterRes(newValue);
    }
  };

  return (
    <div>
      <Grid container>
        <ToggleButtonGroup
          exclusive
          className={classes.toggleGroup}
          value={currentFilter}
          onChange={handleChange}
        >
          {FILTER_DATA.map(({ label, value }) => (
            <CustomToggleButton className={classes.toggleButton} key={value} value={value}>
              {label}
            </CustomToggleButton>
          ))}
        </ToggleButtonGroup>
        {currentFilter !== FILTER_TYPES.NONE ? (
          <Button
            size={'small'}
            variant={'text'}
            className={classes.button}
            onClick={() => filterRes(FILTER_TYPES.NONE)}
          >
            Restablecer
          </Button>
        ) : null}
      </Grid>
    </div>
  );
};

Filters.propTypes = {
  onFilter: PropTypes.func,
};

export default Filters;
