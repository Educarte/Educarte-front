import { getAuthToken } from '@/core/contexts';
import { AxiosError, AxiosInterceptorManager, AxiosRequestConfig } from 'axios';

export default function requestInterceptor(
  request: AxiosInterceptorManager<AxiosRequestConfig>
) {
  request.use(
    (config) => {
      if (config.url === '/auth') {
        return config;
      }

      let newHeaders = {
        ...config.headers,
      };

      const token = getAuthToken();

      if (token) {
        newHeaders = {
          ...newHeaders,
          Authorization: `Bearer ${token}`,
        };
      }

      config.headers = newHeaders || {};

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
}
