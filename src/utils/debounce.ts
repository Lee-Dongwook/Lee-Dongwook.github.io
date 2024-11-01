import { AnyFunction } from './AnyFunction';

export const debounce = <T extends AnyFunction>(fn: T, ms: number): T => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const handler = (...args: never[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };

  return handler as T;
};
