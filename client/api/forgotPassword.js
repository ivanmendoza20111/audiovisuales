import api from '@/api';

export const forgotPassword = (data) => {
  return api.post('forgotPassword', data);
};
