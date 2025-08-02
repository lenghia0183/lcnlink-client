type Breakpoints = {
  [key: string]: number | string;
};

export const breakpointsWithoutPx: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const breakpoints: Breakpoints = Object.fromEntries(
  Object.entries(breakpointsWithoutPx).map(([key, value]) => [key, `${value}px`]),
) as Breakpoints;
