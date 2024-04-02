import axiosInstance from '@/core/configs/axios';

import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ListUsersQuery,
  ListUsersResponse,
  ResetPasswordRequest,
  UserResetPasswordRequest,
  UsersRequest,
  VerifyCodeQuery,
} from './users.types';

const URL_CONTROLLER = `/Users`;

export default {
  async list(params?: ListUsersQuery) {
    const result = await axiosInstance.get<ListUsersResponse>(
      `${URL_CONTROLLER}`,
      { params }
    );
    return result?.data;
  },

  async create(data: UsersRequest) {
    const result = await axiosInstance.post<unknown>(`${URL_CONTROLLER}`, data);
    return result?.data;
  },

  async edit(data?: UsersRequest) {
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

  async toggle(id?: string) {
    const result = await axiosInstance.patch<unknown>(
      `${URL_CONTROLLER}/${id}/ToggleActive`
    );
    return result?.data;
  },

  async resetPassword(data?: ResetPasswordRequest) {
    const result = await axiosInstance.post<unknown>(
      `${URL_CONTROLLER}/RequestResetPassword`,
      data
    );
    return result?.data;
  },

  async verifyCode(params?: VerifyCodeQuery) {
    const result = await axiosInstance.get<boolean>(
      `${URL_CONTROLLER}/ValidateResetPasswordCode`,
      { params }
    );
    return result?.data;
  },

  async forgotPassword(data?: ForgotPasswordRequest) {
    const result = await axiosInstance.post<unknown>(
      `${URL_CONTROLLER}/UpdateForgotPassword`,
      data
    );
    return result?.data;
  },

  async changePassword(data?: ChangePasswordRequest) {
    const result = await axiosInstance.put<unknown>(
      `${URL_CONTROLLER}/ChangePassword`,
      data
    );
    return result?.data;
  },

  async resetUserPassword(id?: string, data?: UserResetPasswordRequest) {
    const result = await axiosInstance.patch<unknown>(
      `${URL_CONTROLLER}/${id}/ResetPassword`,
      data
    );
    return result?.data;
  },
};
