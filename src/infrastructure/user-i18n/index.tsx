"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { mhWildsKo, mhWildsEn, mhWildsJa } from "@infrastructure/i18n/mh-wilds";
import {
  homePageKo,
  homePageEn,
  homePageJa,
} from "@infrastructure/i18n/home-page";
type Lang = "en" | "ja" | "ko";
type Namespace =
  | "mhWilds_armor"
  | "mhWilds_charm"
  | "mhWilds_armor_skill"
  | "mhWilds_series_name"
  | "mhWilds_series_skill"
  | "mhWilds_group_name"
  | "mhWilds_group_skill"
  | "mhWilds_common"
  | "mhWilds_greatswords"
  | "mhWilds_sword_N_shield"
  | "mhWilds_dualblades"
  | "mhWilds_longswords"
  | "mhWilds_hammers"
  | "mhWilds_hunting_horn"
  | "mhWilds_charge_blade"
  | "mhWilds_insect_glavie"
  | "mhWilds_bows"
  | "mhWilds_light_bowguns"
  | "mhWilds_heavy_bowguns"
  | "mhWilds_gunlances"
  | "mhWilds_switchaxes"
  | "mhWilds_lances"
  | "mhWilds_weapon_skill"
  | "homePage_common"
  | "homePage_items";
type TranslationSet = Record<Namespace, Record<string, string>>;

const resources: Record<Lang, TranslationSet> = {
  en: {
    mhWilds_armor: mhWildsEn.mhWilds_armor || {},
    mhWilds_charm: mhWildsEn.mhWilds_charm || {},
    mhWilds_armor_skill: mhWildsEn.mhWilds_armor_skill || {},
    mhWilds_series_name: mhWildsEn.mhWilds_series_name || {},
    mhWilds_series_skill: mhWildsEn.mhWilds_armor_series_skill || {},
    mhWilds_group_name: mhWildsEn.mhWilds_group_name || {},
    mhWilds_group_skill: mhWildsEn.mhWilds_group_skill || {},
    mhWilds_common: mhWildsEn.mhWilds_common || {},
    mhWilds_greatswords: mhWildsEn.mhWilds_greatswords || {},
    mhWilds_sword_N_shield: mhWildsEn.mhWilds_sword_N_shield || {},
    mhWilds_dualblades: mhWildsEn.mhWilds_dualblades || {},
    mhWilds_longswords: mhWildsEn.mhWilds_longswords || {},
    mhWilds_hammers: mhWildsEn.mhWilds_hammers || {},
    mhWilds_hunting_horn: mhWildsEn.mhWilds_hunting_horn || {},
    mhWilds_charge_blade: mhWildsEn.mhWilds_charge_blade || {},
    mhWilds_insect_glavie: mhWildsEn.mhWilds_insect_glavie || {},
    mhWilds_bows: mhWildsEn.mhWilds_bows || {},
    mhWilds_light_bowguns: mhWildsEn.mhWilds_light_bowguns || {},
    mhWilds_heavy_bowguns: mhWildsEn.mhWilds_heavy_bowguns || {},
    mhWilds_gunlances: mhWildsEn.mhWilds_gunlances || {},
    mhWilds_switchaxes: mhWildsEn.mhWilds_switchaxes || {},
    mhWilds_lances: mhWildsEn.mhWilds_lances || {},
    mhWilds_weapon_skill: mhWildsEn.mhWilds_weapon_skill || {},
    homePage_common: homePageEn.homePage_common || {},
    homePage_items: homePageEn.homePage_items || {},
  },
  ja: {
    mhWilds_armor: mhWildsJa.mhWilds_armor || {},
    mhWilds_charm: mhWildsJa.mhWilds_charm || {},
    mhWilds_armor_skill: mhWildsJa.mhWilds_armor_skill || {},
    mhWilds_series_name: mhWildsJa.mhWilds_series_name || {},
    mhWilds_series_skill: mhWildsJa.mhWilds_armor_series_skill || {},
    mhWilds_group_name: mhWildsJa.mhWilds_group_name || {},
    mhWilds_group_skill: mhWildsJa.mhWilds_group_skill || {},
    mhWilds_common: mhWildsJa.mhWilds_common || {},
    mhWilds_greatswords: mhWildsJa.mhWilds_greatswords || {},
    mhWilds_sword_N_shield: mhWildsJa.mhWilds_sword_N_shield || {},
    mhWilds_dualblades: mhWildsJa.mhWilds_dualblades || {},
    mhWilds_longswords: mhWildsJa.mhWilds_longswords || {},
    mhWilds_hammers: mhWildsJa.mhWilds_hammers || {},
    mhWilds_hunting_horn: mhWildsJa.mhWilds_hunting_horn || {},
    mhWilds_charge_blade: mhWildsJa.mhWilds_charge_blade || {},
    mhWilds_insect_glavie: mhWildsJa.mhWilds_insect_glavie || {},
    mhWilds_bows: mhWildsJa.mhWilds_bows || {},
    mhWilds_light_bowguns: mhWildsJa.mhWilds_light_bowguns || {},
    mhWilds_heavy_bowguns: mhWildsJa.mhWilds_heavy_bowguns || {},
    mhWilds_gunlances: mhWildsJa.mhWilds_gunlances || {},
    mhWilds_switchaxes: mhWildsJa.mhWilds_switchaxes || {},
    mhWilds_lances: mhWildsJa.mhWilds_lances || {},
    mhWilds_weapon_skill: mhWildsJa.mhWilds_weapon_skill || {},
    homePage_common: homePageJa.homePage_common || {},
    homePage_items: homePageJa.homePage_items || {},
  },
  ko: {
    mhWilds_armor: mhWildsKo.mhWilds_armor || {},
    mhWilds_charm: mhWildsKo.mhWilds_charm || {},
    mhWilds_armor_skill: mhWildsKo.mhWilds_armor_skill || {},
    mhWilds_series_name: mhWildsKo.mhWilds_series_name || {},
    mhWilds_series_skill: mhWildsKo.mhWilds_armor_series_skill || {},
    mhWilds_group_name: mhWildsKo.mhWilds_group_name || {},
    mhWilds_group_skill: mhWildsKo.mhWilds_group_skill || {},
    mhWilds_common: mhWildsKo.mhWilds_common || {},
    mhWilds_greatswords: mhWildsKo.mhWilds_greatswords || {},
    mhWilds_sword_N_shield: mhWildsKo.mhWilds_sword_N_shield || {},
    mhWilds_dualblades: mhWildsKo.mhWilds_dualblades || {},
    mhWilds_longswords: mhWildsKo.mhWilds_longswords || {},
    mhWilds_hammers: mhWildsKo.mhWilds_hammers || {},
    mhWilds_hunting_horn: mhWildsKo.mhWilds_hunting_horn || {},
    mhWilds_charge_blade: mhWildsKo.mhWilds_charge_blade || {},
    mhWilds_insect_glavie: mhWildsKo.mhWilds_insect_glavie || {},
    mhWilds_bows: mhWildsKo.mhWilds_bows || {},
    mhWilds_light_bowguns: mhWildsKo.mhWilds_light_bowguns || {},
    mhWilds_heavy_bowguns: mhWildsKo.mhWilds_heavy_bowguns || {},
    mhWilds_gunlances: mhWildsKo.mhWilds_gunlances || {},
    mhWilds_switchaxes: mhWildsKo.mhWilds_switchaxes || {},
    mhWilds_lances: mhWildsKo.mhWilds_lances || {},
    mhWilds_weapon_skill: mhWildsKo.mhWilds_weapon_skill || {},
    homePage_common: homePageKo.homePage_common || {},
    homePage_items: homePageKo.homePage_items || {},
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
