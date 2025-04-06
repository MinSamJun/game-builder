"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";

type EquipmentNamespace = "mhWilds_armor" | "mhWilds_charm" | "mhWilds_skill";

export function MHWildsContent() {
  const { lang, setLang, getNamespaceData } = useI18n();
  const [type, setType] = useState<EquipmentNamespace>("mhWilds_armor");
  const [term, setTerm] = useState("");

  const translations = getNamespaceData(type);
  const commonTranslations = getNamespaceData("mhWilds_common");
  const filtered = Object.entries(translations || {}).filter(([, value]) =>
    value.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        Monster Hunter Wilds - Build Planner
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setLang("ko")}
          className={`px-4 py-2 rounded ${
            lang === "ko" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          한국어
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-4 py-2 rounded ${
            lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLang("ja")}
          className={`px-4 py-2 rounded ${
            lang === "ja" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          日本語
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setType("mhWilds_armor")}
          className={`px-4 py-2 rounded ${
            type === "mhWilds_armor"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {commonTranslations.mhWilds_armor}
        </button>
        <button
          onClick={() => setType("mhWilds_charm")}
          className={`px-4 py-2 rounded ${
            type === "mhWilds_charm"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {commonTranslations.mhWilds_charm}
        </button>
        <button
          onClick={() => setType("mhWilds_skill")}
          className={`px-4 py-2 rounded ${
            type === "mhWilds_skill"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {commonTranslations.mhWilds_skill}
        </button>
      </div>

      <input
        type="text"
        placeholder={commonTranslations.mhwilds_common_searchPlaceholder}
        className="mb-6 px-4 py-2 border rounded w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(([key, value]) => (
            <div key={key} className="border p-4 rounded shadow">
              <div className="font-semibold">{value}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {commonTranslations.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
