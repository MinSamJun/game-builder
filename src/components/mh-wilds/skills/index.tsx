"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import {
  WeaponSkillList,
  ArmorSkillList,
  SeriesSkillList,
  GroupSkillList,
} from "@/container/mh-wilds/skills";
import { useSelectLanguage } from "@/hook/common/use-select-language";

type EquipmentNamespace =
  | "mhWilds_weapon_skill"
  | "mhWilds_armor_skill"
  | "mhWilds_series_skill"
  | "mhWilds_group_skill";

export function MhWildsSkills() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();
  const [equipmentType, setEquipmentType] = useState<EquipmentNamespace>(
    "mhWilds_weapon_skill"
  );
  const [term, setTerm] = useState("");

  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common");

  const skillButtonGroups = [
    { type: "mhWilds_weapon_skill", namespace: "mhWilds_common_weapon_skill" },
    { type: "mhWilds_armor_skill", namespace: "mhWilds_common_armor_skill" },
    { type: "mhWilds_series_skill", namespace: "mhwilds_common_series_skill" },
    { type: "mhWilds_group_skill", namespace: "mhwilds_common_group_skill" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {mhWildsmhCommonNamespace?.mhWilds_planner}
      </div>

      <LanguageSelector />

      <div className="mb-6 flex space-x-4">
        {skillButtonGroups.map(({ type, namespace }) => (
          <button
            key={type}
            onClick={() => setEquipmentType(type as EquipmentNamespace)}
            className={`px-4 py-2 rounded ${
              equipmentType === type
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {mhWildsmhCommonNamespace?.[namespace]}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder={mhWildsmhCommonNamespace?.mhwilds_common_searchPlaceholder}
        className="mb-6 px-4 py-2 border rounded w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      {equipmentType === "mhWilds_weapon_skill" ? (
        <WeaponSkillList searchTerm={term} />
      ) : equipmentType === "mhWilds_armor_skill" ? (
        <ArmorSkillList searchTerm={term} />
      ) : equipmentType === "mhWilds_series_skill" ? (
        <SeriesSkillList searchTerm={term} />
      ) : equipmentType === "mhWilds_group_skill" ? (
        <GroupSkillList searchTerm={term} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {mhWildsmhCommonNamespace?.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
