"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { ArmorList, CharmList } from "@/container/mh-wilds/armor-n-charms";

type EquipmentNamespace = "mhWilds_armor" | "mhWilds_charm";

export function MhWildsArmorNCharm() {
  const { getNamespaceData } = useI18n();
  const [equipmentType, setEquipmentType] =
    React.useState<EquipmentNamespace>("mhWilds_armor");
  const [term, setTerm] = React.useState("");

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common");

  const armorButtonGroups = [
    { type: "mhWilds_armor", namespace: "mh_common_armor" },
    { type: "mhWilds_charm", namespace: "mh_common_charm" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {mhWildsmhCommonNamespace?.mhWilds_planner}
      </div>

      <div className="mb-6 flex space-x-4">
        {armorButtonGroups.map(({ type, namespace }) => (
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
