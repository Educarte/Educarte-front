import axiosInstance from '@/core/configs/axios';
import { ListMenusQuery, ListMenusResponse, MenusRequest } from './menu.types';

const URL_CONTROLLER = `/Menus`;

export default {
  async list(params?: ListMenusQuery) {
    const result = await axiosInstance.get<ListMenusResponse>(
      `${URL_CONTROLLER}`,
      { params }
    );
    return result?.data;
  },

  async toggle(id?: string) {
    const result = await axiosInstance.patch<unknown>(
      `${URL_CONTROLLER}/${id}/ToggleActive`
    );
    return result?.data;
  },

  async edit(data?: MenusRequest) {
    const result = await axiosInstance.put<unknown>(
      `${URL_CONTROLLER}/${data?.id}`,
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

  async create(data: MenusRequest) {
    const result = await axiosInstance.post<unknown>(`${URL_CONTROLLER}`, data);
    return result?.data;
  },
};
