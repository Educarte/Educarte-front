import { BaseQuery, PaginatedResponse } from '@/core/types';

export type UserStatus = 0 | 1;

export interface User {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  role: {
    id: string;
    name: string;
  };
  status: UserStatus;
  createdAt: string | null;
  modifiedAt: string | null;
  deletedAt: string | null;
}

export type ListUsersQuery = BaseQuery & {
  roleId?: string | null;
};

export type ListUsersResponse = PaginatedResponse<User>;

export interface UserRequest {
  id?: string;
  name: string;
  email: string;
  cellphone: string;
  roleId: string;
}

export type SimpleListUsersResponse = PaginatedResponse<{
  id: string;
  name: string;
  email: string;
}>;

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface VerifyCodeQuery {
  code?: string;
}

export interface ForgotPasswordRequest {
  code?: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserResetPasswordRequest {
  userId: string;
  newPassword: string;
  confirmPassword: string;
}
