import {
  IS_2FA_ENUM,
  USER_GENDER_ENUM,
  USER_LOCKED_ENUM,
  USER_ROLE_ENUM,
} from "@/constants/common";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  dateOfBirth: string;
  fullname: string;
  email: string;
  role: USER_ROLE_ENUM;
  gender: USER_GENDER_ENUM;
  phone: string;
  avatar: string | null;
  twoFactorSecret?: string;
  twoFactorQr: string;
  isEnable2FA: IS_2FA_ENUM;
  isActive: IS_2FA_ENUM;
  isLocked: USER_LOCKED_ENUM;
}
