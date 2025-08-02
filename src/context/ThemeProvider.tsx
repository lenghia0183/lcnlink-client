'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { setCookie, getCookie } from 'cookies-next';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: string;
}

export default function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const savedTheme = getCookie('theme') as string | undefined;
  if (savedTheme === undefined) {
    setCookie('theme', 'dark', { path: '/', maxAge: 7 * 24 * 60 * 60 });
  }
  const [theme, setThemeState] = useState<string>(savedTheme || initialTheme);

  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('theme', theme);
    // setCookie('theme', theme, { path: '/', maxAge: 7 * 24 * 60 * 60 });
  };

  const applySystemTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    applyTheme(systemTheme);
  };

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    setCookie('theme', newTheme, { path: '/', maxAge: 7 * 24 * 60 * 60 });

    if (newTheme === 'system') {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  };

  useEffect(() => {
    if (theme === 'system') {
      applySystemTheme();
    } else {
      applyTheme(theme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      console.log('onChange');
      if (theme === 'system') {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);

    return () => mediaQuery.removeEventListener('change', handleSystemChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
