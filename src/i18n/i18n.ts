import constate from "constate";
import { useCallback, useState } from "react";
import I18n from "react-native-i18n";
import en from "i18n/locales/en";
import ru from "i18n/locales/ru";

I18n.fallbacks = true;
I18n.translations = {
  en,
  ru,
};

export default I18n;

export const [I18nContextProvider, useI18n] = constate(() => {
  const [locale, setLocaleState] = useState(I18n.locale);
  const setLocale = useCallback((locale: string) => {
    alert(`set locale: ${locale}`);
    setLocaleState(locale);
  }, []);
  const t = useCallback<typeof I18n.t>(
    (scope, options) => {
      return I18n.t(scope, { ...options, locale });
    },
    [locale]
  );

  return { locale, setLocale, t };
});
