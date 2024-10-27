import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './locales/ko';
import en from './locales/en';

export const defaultNS = 'translation';
export const resources = { ko, en };

const preferredLanguage = navigator.language === 'ko-KR' ? 'ko' : 'en';
const storedLanguage = localStorage.getItem('language');

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: storedLanguage || preferredLanguage,
});

export default i18n;
