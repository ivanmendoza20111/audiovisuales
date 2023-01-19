import { getData } from '@/api/get';
import create from 'zustand';

const useRoleStore = create((set, get) => ({
  role: [],
  error: null,
  fetchAllRole: async () => {
    try {
      if (get().role.length) return;
      const response = await getData('role');
      set({
        role: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getRoleById: (roleId) => {
    return get().role.filter(({ id }) => id === roleId)[0];
  },
}));

useRoleStore.subscribe(console.log);

export default useRoleStore;
