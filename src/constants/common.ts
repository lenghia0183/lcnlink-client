export const ERROR = {
  UNAUTHENTICATED: "unauthenticated",
  UNAUTHORIZED: "unauthorized",
};

export const EVENT_EMITTER = {
  LOGOUT: "logout",
};

export enum BOOLEAN_ENUM {
  TRUE = 1,
  FALSE = 0,
}

export enum USER_GENDER_ENUM {
  MALE,
  FEMALE,
  OTHER,
}
export enum USER_LOCKED_ENUM {
  UNLOCKED,
  LOCKED,
}
export enum IS_2FA_ENUM {
  DISABLED,
  ENABLED,
}

export enum USER_ROLE_ENUM {
  USER,
  ADMIN,
  GUEST,
}

export const LINK_STATUS = {
  ACTIVE: "active",
  EXPIRED: "expired",
  DISABLED: "disabled",
  LIMIT_REACHED: "limit_reached",
};

export const AUTH_FLOW = {
  VERIFY_EMAIL: "verify-email",
  RESET_PASSWORD: "reset-password",
  TWO_FACTOR: "2fa",
} as const;

export type AuthFlow = (typeof AUTH_FLOW)[keyof typeof AUTH_FLOW];

export type LinkStatus = (typeof LINK_STATUS)[keyof typeof LINK_STATUS];
