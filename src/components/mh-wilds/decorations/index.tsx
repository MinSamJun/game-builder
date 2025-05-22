"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import {
  WeaponSkillDecorationList,
  ArmorSkillDecorationList,
} from "@/container/mh-wilds/decorations";

type EquipmentNamespace =
  | "mhWilds_weapon_decoration"
  | "mhWilds_armor_decoration";

export function MhWildsDecoList() {
  const { getNamespaceData } = useI18n();
  const [equipmentType, setEquipmentType] = useState<EquipmentNamespace>(
    "mhWilds_weapon_decoration"
  );
  const [term, setTerm] = useState("");

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common");

  const decorationButtonGroups = [
    {
      type: "mhWilds_weapon_decoration",
      namespace: "mh_common_weapon_decoration",
    },
    {
      type: "mhWilds_armor_decoration",
      namespace: "mh_common_armor_decoration",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {mhWildsmhCommonNamespace?.mhWilds_planner}
      </div>

      <div className="mb-6 flex space-x-4">
        {decorationButtonGroups.map(({ type, namespace }) => (
          <button
            key={type}
            onClick={() => setEquipmentType(type as EquipmentNamespace)}
            className={`px-4 py-2 rounded ${
              equipmentType === type
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {mhCommonNamespace?.[namespace]}
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
