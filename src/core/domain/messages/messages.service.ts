import axiosInstance from '@/core/configs/axios';
import {
  ClassroomListRequestParams,
  ClassroomListResponse,
  ListMessagesQuery,
  ListMessagesResponse,
  MessagesRequest,
  StudentsListRequestParams,
  StudentsListResponse,
} from './messages.types';

const URL_CONTROLLER = `/Diary`;

export default {
  async list(params?: ListMessagesQuery) {
    const result = await axiosInstance.get<ListMessagesResponse>(
      `${URL_CONTROLLER}`,
      { params }
    );
    return result?.data;
  },

  async edit(data?: MessagesRequest) {
    const result = await axiosInstance.put<unknown>(
      `${URL_CONTROLLER}/${data?.id}`,
      data
    );
    return result?.data;
  },

  async create(data: MessagesRequest) {
    const result = await axiosInstance.post<unknown>(`${URL_CONTROLLER}`, data);
    return result?.data;
  },

  async listStudents(params?: StudentsListRequestParams) {
    const result = await axiosInstance.get<StudentsListResponse>(`/Students`, {
      params,
    });
    return result.data;
  },

  async listClassroom(params?: ClassroomListRequestParams) {
    const result = await axiosInstance.get<ClassroomListResponse>(
      `/Classroom`,
      {
        params,
      }
    );
    return result.data;
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
