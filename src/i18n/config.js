import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Japanese from "./locales/ja/translation.json";
import English from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
    fallbackLng: "ja",
    interpolation: {
        escapeValue: false // not needed for react as it escapes by default
    },
    lng: import.meta.env.VITE_APP_LG,
    resources: {
        ja: {
            translations: Japanese
        },
        en: {
            translations: English
        }
    },
    ns: ["translations"],
    defaultNS: "translations"
});

export default i18n;
