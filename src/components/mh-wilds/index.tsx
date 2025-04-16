"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import {
  ArmorList,
  CharmList,
  ArmorSkillList,
  SeriesSkillList,
  GroupSkillList,
  GreatswordList,
  BowList,
} from "@/container/mh-wilds";

type EquipmentNamespace =
  | "mhWilds_armor"
  | "mhWilds_charm"
  | "mhWilds_armor_skill"
  | "mhWilds_series_skill"
  | "mhWilds_group_skill"
  | "mhWilds_weapon_skill"
  | "mhWilds_greatswords"
  | "mhWilds_bows";

export function MHWildsContent() {
  const { lang, setLang, getNamespaceData } = useI18n();
  const [equipmentType, setEquipmentType] =
    useState<EquipmentNamespace>("mhWilds_armor");
  const [term, setTerm] = useState("");

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common");

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {mhWildsmhCommonNamespace?.mhWilds_planner}
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
          onClick={() => setEquipmentType("mhWilds_armor")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_armor"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_armor}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_charm")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_charm"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_charm}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_armor_skill")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_armor_skill"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhWildsmhCommonNamespace?.mhWilds_common_armor_skill}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_series_skill")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_series_skill"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhWildsmhCommonNamespace?.mhwilds_common_series_skill}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_group_skill")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_group_skill"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhWildsmhCommonNamespace?.mhwilds_common_group_skill}
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setEquipmentType("mhWilds_greatswords")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_greatswords"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_greatsword}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_bows")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_bows"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_bow}
        </button>
      </div>

      <input
        type="text"
        placeholder={mhWildsmhCommonNamespace?.mhwilds_common_searchPlaceholder}
        className="mb-6 px-4 py-2 border rounded w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      {equipmentType === "mhWilds_armor" ? (
        <ArmorList searchTerm={term} />
      ) : equipmentType === "mhWilds_charm" ? (
        <CharmList searchTerm={term} />
      ) : equipmentType === "mhWilds_armor_skill" ? (
        <ArmorSkillList searchTerm={term} />
      ) : equipmentType === "mhWilds_series_skill" ? (
        <SeriesSkillList searchTerm={term} />
      ) : equipmentType === "mhWilds_group_skill" ? (
        <GroupSkillList searchTerm={term} />
      ) : equipmentType === "mhWilds_greatswords" ? (
        <GreatswordList searchTerm={term} />
      ) : equipmentType === "mhWilds_bows" ? (
        <BowList searchTerm={term} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {mhWildsmhCommonNamespace?.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
