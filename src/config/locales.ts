export const Locales = {
  EN: 'en-US',
  VI: 'vi-VN',
} as const;

export const LocalesArray = Object.values(Locales);

export const defaultLocale: Locale = Locales.VI;

export type Locale = (typeof Locales)[keyof typeof Locales];
