import { removeAuthToken } from '@/core/contexts';
import { AxiosError, AxiosInterceptorManager, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export default function responseInterceptor(
  response: AxiosInterceptorManager<AxiosResponse>
) {
  response.use(
    (config) => config,
    (error: AxiosError) => {
      if (error.status === 401) {
        toast('Sessão expirada. Realize o login novamente.', {
          type: 'error',
        });
        setTimeout(() => {
          removeAuthToken();
          window.location.href = '/login';
        }, 3000);

        throw new Error('Sessão expirada!');
      }

      return Promise.reject(error);
    }
  );
}
