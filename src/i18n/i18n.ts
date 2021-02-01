import { useCallback, useState } from "react";
import I18n from "react-native-i18n";
import en from "i18n/locales/en";
import ru from "i18n/locales/ru";

I18n.fallbacks = true;
I18n.translations = {
	en,
	ru
};

export default I18n;

export function useI18n() {
	const [locale, setLocaleState] = useState(localStorage.getItem("locale") || I18n.locale);
	const setLocale = useCallback((locale: string) => {
		setLocaleState(locale);
		localStorage.setItem("locale", locale);
	}, []);
	const t = useCallback<typeof I18n.t>((scope, options) => {
		return I18n.t(scope, { ...options, locale });
	}, [locale]);

	return { locale, setLocale, t };
}
