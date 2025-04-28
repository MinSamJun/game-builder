"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import {
  WeaponSkillDecorationList,
  ArmorSkillDecorationList,
} from "@/container/mh-wilds";
import { useSelectLanguage } from "@/hook/common/use-select-language";
type EquipmentNamespace =
  | "mhWilds_weapon_decoration"
  | "mhWilds_armor_decoration";

export function MhWildsDecoList() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();
  const [equipmentType, setEquipmentType] = useState<EquipmentNamespace>(
    "mhWilds_weapon_decoration"
  );
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
          onClick={() => setEquipmentType("mhWilds_weapon_decoration")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_weapon_decoration"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_weapon_decoration}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_armor_decoration")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_armor_decoration"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_armor_decoration}
        </button>
      </div>

      <input
        type="text"
        placeholder={mhWildsmhCommonNamespace?.mhwilds_common_searchPlaceholder}
        className="mb-6 px-4 py-2 border rounded w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      {equipmentType === "mhWilds_weapon_decoration" ? (
        <WeaponSkillDecorationList searchTerm={term} />
      ) : equipmentType === "mhWilds_armor_decoration" ? (
        <ArmorSkillDecorationList searchTerm={term} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {mhWildsmhCommonNamespace?.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
