import { BaseQuery, PaginatedResponse } from '@/core/types';

export interface Users {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  legalGuardianType: string;
  profile: number;
  status: number;
}

export interface UsersRequest {
  id?: string;
  name: string;
  email: string;
  cellphone: string;
  profile: number | string;
}

export type ListUsersQuery = BaseQuery & {
  profile?: number | string | null;
};

export type ListUsersResponse = PaginatedResponse<Users>;

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
