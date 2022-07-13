import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import english from './en.json';
import chinese from './cn.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LANGUAGE_STOGRAGE_KEY = '@APP:languageCode';

i18next.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: english,
    cn: chinese,
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
