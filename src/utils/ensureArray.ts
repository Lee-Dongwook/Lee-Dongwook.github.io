export const ensureArray = <T>(target: T | T[]): T[] => {
  if (Array.isArray(target)) return target;

  return target === undefined ? [] : [target];
};
