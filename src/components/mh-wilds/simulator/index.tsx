"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import {
  WeaponSimulator,
  ArmorSimulator,
} from "@/container/mh-wilds/simulator";
import { useSelectLanguage } from "@/hook/common/use-select-language";

type EquipmentNamespace = "mhWilds_weapon" | "mhWilds_armor";

export function MhWildsSimulator() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common");

  const [equipmentType, setEquipmentType] =
    React.useState<EquipmentNamespace>("mhWilds_weapon");

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {mhWildsmhCommonNamespace?.mhWilds_planner}
      </div>

      <LanguageSelector />

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setEquipmentType("mhWilds_weapon")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_weapon"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_weapon}
        </button>
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
      </div>

      {equipmentType === "mhWilds_weapon" ? (
        <WeaponSimulator />
      ) : equipmentType === "mhWilds_armor" ? (
        <ArmorSimulator />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {mhWildsmhCommonNamespace?.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
