"use client";

import React, { useCallback } from "react";
import { useI18n } from "@infrastructure/user-i18n";

export function useSelectLanguage() {
  const { lang, setLang } = useI18n();

  const LanguageSelector = useCallback(
    () => (
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
    ),
    [lang, setLang]
  );

  return {
    lang,
    setLang,
    LanguageSelector,
  };
}
