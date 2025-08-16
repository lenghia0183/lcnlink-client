import { User } from "./user";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userData: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userData: User;
}

export interface RegisterBody {
  fullname: string;
  password: string;
  email: string;
  phone?: string;
  gender?: number;
  dateOfBirth?: string;
}

export type RegisterResponse = User;
