import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import i18n, {ContentLanguage} from '../i18n';
import {storage} from './storage';
import {StorageKeys} from '../constants/storageKeys';

export type LocalizationAppContextType = {
  /**
   * This variable is of type ContentLanguage and is used to store the language of content.
   * language = "English";
   */
  language: ContentLanguage;
  /**
   * Boolean to track if a language has been explicitly selected by the user.
   */
  isLanguageSelected: boolean;
  /**
   * For setLanguage change content lang
   * @example i18n.locale = ContentLanguage.France
   * @return void change app content language.
   */
  setLanguageInApp: (lang: ContentLanguage) => void;
};

export const LocalizationAppContext = createContext<
  LocalizationAppContextType | undefined
>(undefined);

export const useLanguage = () => {
  const context = useContext(LocalizationAppContext);
  if (!context)
    throw Error('useLanguage must be used inside LocalizationAppContext');
  return context;
};

export const LocalizationProvider = ({children}: React.PropsWithChildren) => {
  const [language, setLanguage] = useState<ContentLanguage>(
    ContentLanguage.English,
  );

  // New state to track if a language has been explicitly selected
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  /**
   * For setLanguage change content lang
   * i18n.locale = ContentLanguage.France
   * @return void change app content language.
   */
  const setLanguageInApp = useCallback((lang: ContentLanguage) => {
    storage.setData(StorageKeys.APP_LANGUAGE, lang);
    i18n.locale = lang;
    setLanguage(lang);

    // Set isLanguageSelected to true when a language is selected
    setIsLanguageSelected(true);
  }, []);

  const value: LocalizationAppContextType = useMemo(() => {
    return {
      language,
      isLanguageSelected,
      setLanguageInApp,
    };
  }, [language, isLanguageSelected, setLanguageInApp]);

  useEffect(() => {
    const appLanguage = storage.getData(StorageKeys.APP_LANGUAGE);
    if (appLanguage) {
      setLanguageInApp(appLanguage);
      setIsLanguageSelected(true); // Mark as selected if a language is already stored
    }
  }, [setLanguageInApp]);

  return (
    <LocalizationAppContext.Provider value={value}>
      {children}
    </LocalizationAppContext.Provider>
  );
};
