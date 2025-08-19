export const buildFilterFromObject = (obj: Record<string, unknown>) => {
  const filters = Object.entries(obj).map(([key, value]) => ({
    column: key,
    text: String(value),
  }));

  return JSON.stringify(filters);
};
