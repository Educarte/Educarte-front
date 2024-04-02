import axiosInstance from '@/core/configs/axios';
import {
  ListContentsQuery,
  ListContentsResponse,
  ContentRequest,
} from './contents.types';

const URL_CONTROLLER = `/Contents`;

export default {
  async list(params?: ListContentsQuery) {
    const result = await axiosInstance.get<ListContentsResponse>(
      `${URL_CONTROLLER}`,
      { params }
    );
    return result?.data;
  },

  async create(data: ContentRequest) {
    const result = await axiosInstance.post<unknown>(`${URL_CONTROLLER}`, data);
    return result?.data;
  },

  async edit(data: ContentRequest) {
    const result = await axiosInstance.put<unknown>(
      `${URL_CONTROLLER}/${data.id}`,
      data
    );
    return result?.data;
  },

  async toggle(id?: string) {
    const result = await axiosInstance.patch<unknown>(
      `${URL_CONTROLLER}/${id}/ToggleActive`
    );
    return result?.data;
  },

  async remove(id?: string) {
    const result = await axiosInstance.delete<unknown>(
      `${URL_CONTROLLER}/${id}`
    );
    return result?.data;
  },
};
