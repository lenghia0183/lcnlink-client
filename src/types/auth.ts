import { User } from "./user";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userData: User;
}
