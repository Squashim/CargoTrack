import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enAuth from '@/locales/en/auth.json';
import enCommon from '@/locales/en/common.json';
import enNav from '@/locales/en/nav.json';
import enValidation from '@/locales/en/validation.json';

import plAuth from '@/locales/pl/auth.json';
import plCommon from '@/locales/pl/common.json';
import plNav from '@/locales/pl/nav.json';
import plValidation from '@/locales/pl/validation.json';

export const resources = {
  en: {
    auth: enAuth,
    common: enCommon,
    nav: enNav,
    validation: enValidation,
  },
  pl: {
    auth: plAuth,
    common: plCommon,
    nav: plNav,
    validation: plValidation,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
