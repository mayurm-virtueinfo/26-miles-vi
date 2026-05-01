import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({//@ts-ignore
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: Localization.locale?.split('-')[0], // e.g., "en", "fr"
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
