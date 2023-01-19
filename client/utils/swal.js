import { NOT_USER_DATA_FOUND_MESSAGE } from '@/utils/constant';
import Swal from 'sweetalert2';

export const swalError = async (text = NOT_USER_DATA_FOUND_MESSAGE) => {
  await Swal.fire({
    title: 'Error!',
    showConfirmButton: false,
    icon: 'error',
    text,
  });
};

export const swalSuccess = async () => {
  await Swal.fire({
    title: 'Reservación Exitosa!',
    showConfirmButton: false,
    icon: 'success',
    text: 'Se ha reservado exitosamente los equipos audiovisuales seleccionados',
  });
};

export const swalBadRequest = async (text) => {
  await Swal.fire({
    title: 'Ha sucecido algo inesperado!',
    showConfirmButton: false,
    icon: 'warning',
    text,
  });
};
