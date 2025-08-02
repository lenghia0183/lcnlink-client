export const TEXTFIELD_PREVENT: {
  NUMERIC: RegExp;
  POSITIVE_DECIMAL: RegExp;
  ALPHA: RegExp;
  ALPHANUMERIC: RegExp;
} = {
  NUMERIC: /^[0-9]*$/,
  POSITIVE_DECIMAL: /^[0-9.]*$/,
  ALPHA: /^[a-zA-Z]*$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]*$/,
};

export const TEXTFIELD_ALLOW: {
  NUMERIC: RegExp;
  REAL_NUMBER: RegExp;
  POSITIVE_DECIMAL: RegExp;
  ALPHANUMERIC: RegExp;
  ALPHA: RegExp;
  ALPHANUMERIC_SPECIAL: RegExp;
  VIETNAMESE: RegExp;
  VIETNAMESE_SPECIAL: RegExp;
} = {
  NUMERIC: /[^0-9.]/g,
  REAL_NUMBER: /[^1-9.]/g,
  POSITIVE_DECIMAL: /[^0-9.]/g,
  ALPHANUMERIC: /[^a-zA-Z0-9]*/g,
  ALPHA: /[^a-zA-Z]/g,
  ALPHANUMERIC_SPECIAL: /[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/g,
  VIETNAMESE: /[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỹỳỵỷ\s]/g,
  VIETNAMESE_SPECIAL:
    /[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỹỳỵỷ\s!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/g,
};

export const TEXTFIELD_LENGTH: {
  MIN: number;
  MAX_10: number;
  MAX_50: number;
  COMMON: number;
} = {
  MIN: 0,
  MAX_10: 10,
  MAX_50: 50,
  COMMON: 255,
};
