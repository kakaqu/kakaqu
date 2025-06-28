import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import fa from './fa.json';
import en from './en.json';
import tr from './tr.json';
import ps from './ps.json';
import tk from './tk.json';
import ar from './ar.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: Localization.locale.split('-')[0] || 'fa', // cihaz dili, yoksa farsça
    fallbackLng: 'fa',
    resources: {
      fa: { translation: fa },
      en: { translation: en },
      tr: { translation: tr },
      ps: { translation: ps },
      tk: { translation: tk },
      ar: { translation: ar },

    },
    interpolation: {
      escapeValue: false, // React Native'de gereksiz
    },
  });

export default i18n;
