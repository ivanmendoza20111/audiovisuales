import api from '@/api';

export const addReservation = (data) => {
  return api.post('reservations', data);
};

export const editReservation = (data, id) => {
  return api.put(`reservations/${id}`, data);
};

export const getAllReservationsFullInformation = () => {
  return api.get('reservations-full-information');
};
