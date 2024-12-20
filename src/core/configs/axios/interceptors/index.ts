import {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
} from 'axios';
import requestInterceptor from './request';
import responseInterceptor from './response';
import refreshTokenInterceptor from './refreshToken';

export default function axiosInterceptors(instance: AxiosInstance) {
  requestInterceptor(
    instance.interceptors.request as AxiosInterceptorManager<AxiosRequestConfig>
  );
  responseInterceptor(instance.interceptors.response);
  refreshTokenInterceptor(instance.interceptors.response);
}
