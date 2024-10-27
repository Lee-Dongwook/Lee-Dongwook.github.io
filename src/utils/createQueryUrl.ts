export const createQueryURL = (raw: Record<string, string | number | undefined>) => {
  const params: Record<string, string> = {};

  Object.entries(raw).forEach(([key, value]) => {
    if (value === undefined) return;
    params[key] = typeof value === 'number' ? value.toString() : value;
  });

  return `?${new URLSearchParams(params)}`;
};
