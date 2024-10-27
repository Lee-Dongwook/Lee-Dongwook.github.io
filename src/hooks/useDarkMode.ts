import { createContext, useEffect } from 'react';

import useLocalStorage from './useLocalStorage';

export const DarkModeValueContext = createContext(false);

export const useDarkMode = () => {
  const [enabledValue, setEnabledValue] = useLocalStorage<boolean>('dark-mode-enabled');

  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const enabled = enabledValue ?? prefersDarkMode;

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [enabled]);

  return [enabled, setEnabledValue] as const;
};
