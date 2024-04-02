import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/core/contexts';
import { AuthResponse } from './auth.types';
import authService from './auth.service';
import { showNotification } from '@/core/utils';
import { AxiosError } from 'axios';

const APP_HOME = import.meta.env.VITE_APP_HOME;

export function useLogin() {
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  return useMutation(authService.login, {
    onSuccess(data?: AuthResponse) {
      if (data) {
        onLogin(data, () => navigate(APP_HOME));
      } else {
        showNotification({
          variant: 'error',
          message: 'Usuário ou senha inválidos',
        });
      }
    },
    onError(error) {
      showNotification({
        variant: 'error',
        errors: error as AxiosError,
      });
    },
  });
}
