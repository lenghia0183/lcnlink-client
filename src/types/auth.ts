import { User } from "./user";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userData: User;
}

export interface LoginBody {
  password: string;
  email: string;
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

export interface ForgotPasswordBody {
  email: string;
}

export interface ResetPasswordBody {
  newPassword: string;
  token: string;
}

export interface UpdateMeBody {
  fullname?: string;
  email?: string;
  phone?: string;
  gender?: number;
  dateOfBirth?: string;
}

export type RegisterResponse = User;
