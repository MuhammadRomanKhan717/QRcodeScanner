import {I18n} from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import ar from './locales/ar.json';
import ur from './locales/ur.json';
import zh from './locales/zh.json';
import hi from './locales/hi.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import bn from './locales/bn.json';
import id from './locales/id.json';
import ja from './locales/ja.json';
import de from './locales/de.json';
import ko from './locales/ko.json';
import tr from './locales/tr.json';
import it from './locales/it.json';
import ha from './locales/ha.json';
const locales = RNLocalize.getLocales();

const i18n = new I18n();

if (Array.isArray(locales)) {
  i18n.locale = locales[0]?.languageTag ? locales[0].languageTag : 'en';
}
export const locale = locales[0]?.languageCode;

i18n.enableFallback = true;

i18n.defaultLocale = 'en';

i18n.translations = {
  en,
  ar,
  ur,
  zh,
  hi,
  es,
  fr,
  pt,
  ru,
  bn,
  id,
  ja,
  de,
  ko,
  tr,
  it,
  ha,
};

export default i18n;

export enum ContentLanguage {
  English = 'en',
  العربية = 'ar',
  Urdu = 'ur',
  Chinese = 'zh',
  Hindi = 'hi',
  Spanish = 'es',
  French = 'fr',
  Portuguese = 'pt',
  Russian = 'ru',
  Bengali = 'bn',
  Indonesian = 'id',
  Japanese = 'ja',
  German = 'de',
  Korean = 'ko',
  Turkish = 'tr',
  Italian = 'it',
  Nigerian = 'ha',
}

export type TxKeyPath = RecursiveKeyOf<typeof en>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
