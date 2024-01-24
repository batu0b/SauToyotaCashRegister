import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import tr from "./tr.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",
    resources: {
      en: {
        ...en,
      },
      tr: {
        ...tr,
      },
    },
  });

export default i18n;
