import LoginForm from '@/components/auth/LoginForm';
import useAuthStore from '@/stores/authStore';
import { useCallback } from 'react';

const LoginContainer = () => {
  const { errorMessage, login } = useAuthStore((state) => state);

  const handleSubmit = useCallback((values) => login(values), []);

  return <LoginForm handleSubmit={handleSubmit} errorMessage={errorMessage} />;
};

export default LoginContainer;
