import { getData } from '@/api/get';
import create from 'zustand';

const useProductTypeStore = create((set, get) => ({
  productType: [],
  error: null,
  fetchAllProductType: async () => {
    if (get().productType.length) return;
    try {
      const response = await getData('productType');
      set({
        productType: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getProductTypeById: (productTypeId) => {
    return get().productType.filter(({ id }) => id === productTypeId)[0];
  },
}));

useProductTypeStore.subscribe(console.log);

export default useProductTypeStore;
