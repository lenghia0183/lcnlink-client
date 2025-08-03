import { useState, useEffect } from 'react';

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveValue<T> = { [key in Breakpoint]?: T };

const breakpoints: Record<Breakpoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useResponsiveValue<T>(values: ResponsiveValue<T>, fallback: Breakpoint = 'base'): T {
  const computeValue = (): T => {
    if (typeof window === 'undefined') {
      return values[fallback] as T;
    }

    let width = window.innerWidth;

    const match = document.cookie.match(new RegExp('(^| )viewportWidth=([^;]+)'));
    if (match) {
      const cookieWidth = parseInt(match[2], 10);
      if (!isNaN(cookieWidth)) {
        width = cookieWidth;
      }
    }

    const sorted = Object.entries(breakpoints).sort(([, a], [, b]) => b - a) as [Breakpoint, number][];

    for (const [bp, minWidth] of sorted) {
      if (width >= minWidth && values[bp] !== undefined) {
        return values[bp] as T;
      }
    }

    return values[fallback] as T;
  };

  const [currentValue, setCurrentValue] = useState<T>(computeValue);

  useEffect(() => {
    const resizeHandler = () => setCurrentValue(computeValue());
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, fallback]);

  return currentValue;
}
