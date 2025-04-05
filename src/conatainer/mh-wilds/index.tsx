"use client";

import { useState } from "react";
import { ko, en, ja } from "@/infrastructure/i18n/mh-wilds";

const DEFAULT_LANG = "ko";
const NAMESPACES = ["armor", "charm", "skill", "common"];
const EQUIPMENT_TYPES = NAMESPACES.filter((ns) => ns !== "common");

type Lang = "en" | "ja" | "ko";
type Namespace = (typeof NAMESPACES)[number];
type TranslationSet = Record<Namespace, Record<string, string>>;

const initialResources: Record<Lang, TranslationSet> = {
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

export function MHWildsContent() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [type, setType] = useState(EQUIPMENT_TYPES[0]);
  const [term, setTerm] = useState("");
  const [translations, setTranslations] = useState(
    initialResources[DEFAULT_LANG]
  );

  const handleLangChange = (selectedLanguage: Lang) => {
    setLang(selectedLanguage);
    setTranslations(initialResources[selectedLanguage]);
  };

  const filtered = Object.entries(translations[type] || {}).filter(
    ([, value]) => value.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        Monster Hunter Wilds - Build Planner
      </div>

      {/* Language Selector */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => handleLangChange("ko")}
          className={`px-4 py-2 rounded ${
            lang === "ko" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          한국어
        </button>
        <button
          onClick={() => handleLangChange("en")}
          className={`px-4 py-2 rounded ${
            lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          English
        </button>
        <button
          onClick={() => handleLangChange("ja")}
          className={`px-4 py-2 rounded ${
            lang === "ja" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          日本語
        </button>
      </div>

      {/* Equipment Type Selector */}
      <div className="mb-6 flex space-x-4">
        {EQUIPMENT_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded capitalize ${
              type === t ? "bg-green-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search equipment..."
        className="mb-6 px-4 py-2 border rounded w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      {/* Equipment List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(([key, value]) => (
            <div key={key} className="border p-4 rounded shadow">
              <div className="font-semibold">{value}</div>
              <div className="text-gray-500 text-sm">{key}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No equipment found for the current search.
        </div>
      )}
    </div>
  );
}
