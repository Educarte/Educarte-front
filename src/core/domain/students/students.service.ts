import axiosInstance from '@/core/configs/axios';
import {
  LegalGuardiansRequest,
  ListStudentsQuery,
  ListStudentsResponse,
  StudentsDetails,
  StudentsEditRequest,
  StudentsRequest,
} from './students.types';

const URL_CONTROLLER = `/Students`;

export default {
  async list(params?: ListStudentsQuery) {
    const result = await axiosInstance.get<ListStudentsResponse>(
      `${URL_CONTROLLER}`,
      { params }
    );
    return result?.data;
  },

  async edit(data?: StudentsEditRequest) {
    const result = await axiosInstance.put<unknown>(
      `${URL_CONTROLLER}/${data?.id}`,
      data
    );
    return result?.data;
  },

  async details(id?: string) {
    const result = await axiosInstance.get<StudentsDetails>(
      `${URL_CONTROLLER}/${id}`
    );
    return result?.data;
  },

  async create(data: StudentsRequest) {
    const result = await axiosInstance.post<unknown>(`${URL_CONTROLLER}`, data);
    return result?.data;
  },

  async createLegalGuardian(data: LegalGuardiansRequest) {
    const result = await axiosInstance.post<unknown>(
      `${URL_CONTROLLER}/LegalGuardian/${data.id}`,
      data
    );
    return result?.data;
  },

  async remove(id?: string) {
    const result = await axiosInstance.delete<unknown>(
      `${URL_CONTROLLER}/${id}`
    );
    return result?.data;
  },

  async toggle(id?: string) {
    const result = await axiosInstance.patch<unknown>(
      `${URL_CONTROLLER}/${id}/ToggleActive`
    );
    return result?.data;
  },
};
