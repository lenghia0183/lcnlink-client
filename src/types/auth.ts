import { User } from "./user";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userData: User;
  requires2FA?: boolean;
  otpToken?: string;
}

export interface LoginBody {
  password: string;
  email: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
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

export interface ChangePasswordBody {
  newPassword: string;
}

export interface Toggle2FABody {
  otp: string;
}

export interface Login2FABody {
  otp: string;
  otpToken: string;
}

export interface Generate2FAResponse {
  qrCodeUrl: string;
  secret: string;
}

export interface Change2FABody {
  otp: string;
  newTwoFactorSecret: string;
}

export type RegisterResponse = User;
