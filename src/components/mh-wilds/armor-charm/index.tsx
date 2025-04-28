"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { ArmorList, CharmList } from "@/container/mh-wilds";
import { useSelectLanguage } from "@/hook/common/use-select-language";

type EquipmentNamespace = "mhWilds_armor" | "mhWilds_charm";

export function MhWildsArmorNCharm() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();
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
      <LanguageSelector />

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
      ) : (
        <div className="text-center py-8 text-gray-500">
          {mhWildsmhCommonNamespace?.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
