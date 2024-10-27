import { useState } from 'react';

type AnyFunction = (...args: any[]) => any;

export const useHandling = <T extends AnyFunction>(handler: T, initialValue = false) => {
  const [handling, setHandling] = useState(initialValue);

  const execute = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    setHandling(true);
    try {
      const result = await handler(...args);
      return result;
    } finally {
      setHandling(false);
    }
  };

  return [handling, execute] as const;
};
