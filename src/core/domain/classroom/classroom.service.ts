import axiosInstance from '@/core/configs/axios';
import {
  Classroom,
  ClassroomRequest,
  EmployeesListRequestParams,
  EmployeesListResponse,
  ListClassroomQuery,
  ListClassroomResponse,
  TeachersListRequestParams,
  TeachersListResponse,
} from './classroom.types';

const URL_CONTROLLER = `/Classroom`;

export default {
  async list(params?: ListClassroomQuery) {
    const result = await axiosInstance.get<ListClassroomResponse>(
      `${URL_CONTROLLER}`,
      { params }
    );
    return result?.data;
  },

  async edit(data?: ClassroomRequest) {
    const result = await axiosInstance.put<unknown>(
      `${URL_CONTROLLER}/${data?.id}`,
      data
    );
    return result?.data;
  },

  async details(id?: string) {
    const result = await axiosInstance.get<Classroom>(
      `${URL_CONTROLLER}/${id}`
    );
    return result?.data;
  },

  async create(data: ClassroomRequest) {
    const result = await axiosInstance.post<unknown>(`${URL_CONTROLLER}`, data);
    return result?.data;
  },

  async listTeachers(params?: TeachersListRequestParams) {
    const result = await axiosInstance.get<TeachersListResponse>(`/Users`, {
      params,
    });
    return result.data;
  },

  async listEmployees(params?: EmployeesListRequestParams) {
    const result = await axiosInstance.get<EmployeesListResponse>(`/Users`, {
      params,
    });
    return result.data;
  },

  async toggle(id?: string) {
    const result = await axiosInstance.patch<unknown>(
      `${URL_CONTROLLER}/${id}/ToggleActive`
    );
    return result?.data;
  },
};
