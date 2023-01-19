import api from '@/api';

export const addUser = (data) => {
  return api.post('users', data);
};

export const editUser = (data, id) => {
  return api.put(`users/${id}`, data);
};

export const deleteUser = (id) => {
  return api.delete(`users/${id}`);
};

export const getUserById = (id) => {
  return api.get(`users/${id}`);
};

export const getUserByRoleId = (id) => {
  return api.get(`users/role/${id}`);
};

export const getAllUsers = () => {
  return api.get('users');
};

export const updatePassword = (data, id) => {
  return api.put(`/users/reset/${id}`, data);
};
