import axiosInstance from '@/core/configs/axios';
import { AuthResponse, AuthRequest } from './auth.types';

const URL_CONTROLLER = `/Auth`;

export default {
  async login(data: AuthRequest) {
    const result = await axiosInstance.post<AuthResponse>(
      `${URL_CONTROLLER}`,
      data
    );
    return result?.data;
  },

  async refresh() {
    const result = await axiosInstance.post<AuthResponse>(
      `${URL_CONTROLLER}/refresh`
    );

    return result?.data;
  },
};
