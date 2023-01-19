import api from '@/api';

export const addProduct = (data) => {
  return api.post('product', data);
};

export const getAllProduct = () => {
  return api.get('product');
};

export const getProductById = (id) => {
  return api.get(`product/${id}`);
};

export const editProduct = (data, id) => {
  return api.put(`product/${id}`, data);
};

export const deleteProduct = (id) => {
  return api.delete(`product/${id}`);
};
