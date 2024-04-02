import axiosInstance from '@/core/configs/axios';
import {
  ListRegisterQuery,
  RegisterDetails,
  RegisterRequest,
} from './register.types';

const URL_CONTROLLER = `/Students`;

export default {
  async details(params?: ListRegisterQuery, id?: string) {
    const result = await axiosInstance.get<RegisterDetails>(
      `${URL_CONTROLLER}/AccessControls/${id}`,
      {
        params,
      }
    );
    return result?.data;
  },

  async edit(data?: RegisterRequest) {
    console.log({ data });
    const result = await axiosInstance.put<unknown>(
      `/AccessControls/${data?.id}`,
      data
    );
    return result?.data;
  },
};
