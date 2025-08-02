import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { defaultLocale, LocalesArray } from '@/config/locales';

export const routing = defineRouting({
  locales: LocalesArray,
  defaultLocale: defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
