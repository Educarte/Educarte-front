import dayjs from 'dayjs';
import { AxiosError, AxiosInterceptorManager, AxiosResponse } from 'axios';
import {
  getAuthToken,
  getDecodedUser,
  removeAuthToken,
  setAuthToken,
} from '@/core/contexts';
import { AuthResponse } from '@/core/domain/auth';
import authService from '@/core/domain/auth/auth.service';
import { toast } from 'react-toastify';

export default function refreshTokenInterceptor(
  response: AxiosInterceptorManager<AxiosResponse>
) {
  response.use(
    (config) => config,
    async (error: AxiosError) => {
      const token = getAuthToken();
      const router = window.location;

      if (error.response?.status !== 401) return Promise.reject(error);

      if (router.pathname === 'auth' || router.pathname === 'auth/refresh')
        return Promise.reject(error);

      const decodedUser = getDecodedUser(token);

      if (decodedUser !== null) {
        const { exp } = decodedUser;
        const expTime = dayjs.unix(exp);
        const now = dayjs();
        const minutesToExpire = expTime.diff(now, 'minutes');

        if (minutesToExpire > 0 && minutesToExpire <= 10) {
          try {
            const result: AuthResponse = await authService.refresh();
            setAuthToken(result.token);
          } catch {
            return Promise.reject(error);
          }
        } else {
          toast('Sessão expirada. Realize o login novamente.', {
            type: 'error',
          });
          setTimeout(() => {
            removeAuthToken();
            router.href = '/login';
          }, 3000);
        }
      }
    }
  );
}
