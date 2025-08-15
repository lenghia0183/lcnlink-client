import { USER_GENDER_ENUM } from "@/constants/common";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  fullname: string;
  email: string;
  phone: string;
  gender: USER_GENDER_ENUM;
  dateOfBirth: Date;
}
