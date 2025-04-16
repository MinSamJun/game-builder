"use client";

import React, { ReactNode } from "react";
import { mhWildsKo, mhWildsEn, mhWildsJa } from "@infrastructure/i18n/mh-wilds";
import {
  homePageKo,
  homePageEn,
  homePageJa,
} from "@infrastructure/i18n/home-page";
import {
  mhCommonNamespaceEn,
  mhCommonNamespaceJa,
  mhCommonNamespaceKo,
} from "@/infrastructure/i18n/mh-common";
const resources = {
  en: {
    ...mhWildsEn,
    ...homePageEn,
    ...mhCommonNamespaceEn,
  },
  ja: {
    ...mhWildsJa,
    ...homePageJa,
    ...mhCommonNamespaceJa,
  },
  ko: {
    ...mhWildsKo,
    ...homePageKo,
    ...mhCommonNamespaceKo,
  },
};

type Lang = keyof typeof resources;
type TranslationSet = (typeof resources)[Lang];
export type Namespace = keyof TranslationSet;

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (ns: Namespace, key: string) => string;
  getNamespaceData: (ns: Namespace) => Record<string, string>;
}

const I18nContext = React.createContext<I18nContextValue | undefined>(
  undefined
);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = React.useState<Lang>("ko");

  const getNamespaceData = (ns: Namespace): Record<string, string> =>
    resources[lang][ns] || {};
  const t = (ns: Namespace, key: string) => getNamespaceData(ns)[key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, getNamespaceData }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextValue => {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
