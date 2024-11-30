import { JwtPayload } from 'jwt-decode';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  exp: number;
  profile: string;
  sub: string;
  iss: string;
  aud: string;
  iat: number;
}

export interface AuthResponse {
  token: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface LoginTokenJWT extends JwtPayload {
  id: string;
  name: string;
  profile: string;
}
