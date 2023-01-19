import api from '@/api';

export const updatePassword = (data, id) => {
  return api.put(`resetPassword/${id}`, data);
};
