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
