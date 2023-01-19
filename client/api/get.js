import api from '@/api';

const UTESA_REST_API = process.env.UTESA_API_REST;

export const getData = (url) => {
  return api.get(url);
};

export const getDataById = ({ userType, id }) => {
  const url = `${UTESA_REST_API}/${userType}/${id}`;

  return api.get(url);
};
