"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ko, en, ja } from "@infrastructure/i18n/mh-wilds";

type Lang = "en" | "ja" | "ko";
type Namespace = "armor" | "charm" | "skill" | "common";
type TranslationSet = Record<Namespace, Record<string, string>>;

const resources: Record<Lang, TranslationSet> = {
  en: {
    armor: en.enArmor || {},
    charm: en.enCharm || {},
    skill: en.enSkill || {},
    common: en.enCommon || {},
  },
  ja: {
    armor: ja.jaArmor || {},
    charm: ja.jaCharm || {},
    skill: ja.jaSkill || {},
    common: ja.jaCommon || {},
  },
  ko: {
    armor: ko.koArmor || {},
    charm: ko.koCharm || {},
    skill: ko.koSkill || {},
    common: ko.koCommon || {},
  },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (ns: Namespace, key: string) => string;
  getNamespaceData: (ns: Namespace) => Record<string, string>;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ko");

  const t = (ns: Namespace, key: string): string => {
    return resources[lang][ns][key] ?? key;
  };

  const getNamespaceData = (ns: Namespace): Record<string, string> => {
    return resources[lang][ns] || {};
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, getNamespaceData }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
