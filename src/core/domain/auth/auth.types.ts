export interface AuthUser {
  name: string;
  email: string;
  RoleId: string;
  Role: string;
  exp: number;
}

export interface AuthResponse {
  token: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}
