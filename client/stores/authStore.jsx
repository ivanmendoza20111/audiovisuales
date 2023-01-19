import create from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginUser } from '@/api/auth';
import { addUser } from '@/api/user';
import { JWT_TOKEN } from '@/config';
import history from '@/utils/history';
import { clearLocalStorage, setLocalStorage } from '@/utils/storageUtil';

export const userStore = create(
  persist(
    (_, get) => ({
      user: {},
      getFullName: () => `${get().user.firstName} ${get().user.lastName}`,
      isAdmin: () => false, // TODO: isAdmin function
    }),
    {
      name: 'user-storage',
    }
  )
);

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
  login: async ({ email, password }) => {
    try {
      const response = await loginUser({ email, password });
      set({
        isAuthenticated: true,
        isLoading: false,
        token: response.token,
        errorMessage: null,
      });
      userStore.setState({ user: response.data.user });
      setLocalStorage(JWT_TOKEN, response.data.token);
      history.goBack();
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        token: null,
        errorMessage: error.response.data.message || error.message || 'Something went wrong.',
      });
    }
  },
  signUp: async (data) => {
    try {
      await addUser(data);
      set({
        user: {},
        error: null,
      });

      return true;
    } catch (error) {
      set({
        user: null,
        errorMessage:
          error.response.data.details[0].message || error.response.data.message || error.message,
      });

      return false;
    }
  },
  logout: () => {
    clearLocalStorage(JWT_TOKEN);
    userStore.setState({ user: {} });
    set({
      isAuthenticated: false,
      isLoading: true,
      token: null,
      errorMessage: null,
    });
    history.push('/');

    return false;
  },
}));

useAuthStore.subscribe(console.log);

export default useAuthStore;
