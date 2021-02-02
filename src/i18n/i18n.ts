import constate from "constate";
import { useCallback, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import I18n from "react-native-i18n";
import en from "i18n/locales/en";
import ru from "i18n/locales/ru";

I18n.fallbacks = true;
I18n.translations = {
  en,
  ru,
};

export default I18n;

export const outputErrorMessage = (
  error: Error,
  i18nKey: string,
  locale?: string
) => {
  Alert.alert(
    I18n.t("error", { locale }),
    I18n.t(i18nKey, {
      error: error.message || `${error.stack || error}`,
      locale: locale || I18n.locale,
    })
  );
};

export const [I18nContextProvider, useI18n] = constate(() => {
  const [loading, setLoading] = useState(true);
  const [locale, setLocaleState] = useState(I18n.locale);
  const setLocale = useCallback(
    (newLocale: string) => {
      setLocaleState(newLocale);
      AsyncStorage.setItem("language", newLocale)
        .catch((err) => {
          setLocaleState(locale);
          outputErrorMessage(err, "errorWhileSavingLocale", locale);
        });
    },
    [locale]
  );
  useEffect(() => {
    AsyncStorage.getItem("language")
      .then((localeFromStorage) => {
        setLocaleState(localeFromStorage);
      })
      .catch((err) => {
        outputErrorMessage(err, "errorWhileLoadingLocale");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const t = useCallback<typeof I18n.t>(
    (scope, options) => {
      return I18n.t(scope, { ...options, locale });
    },
    [locale]
  );

  return { locale, setLocale, t, loading };
});
