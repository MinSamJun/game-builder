"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import {
  GunlanceList,
  HuntingHornList,
  LightBowgunList,
  HeavyBowgunList,
  CommonWeaponsList,
  SingleResourceWeaponsList,
} from "@/container/mh-wilds/weapons";
import { useSelectLanguage } from "@/hook/common/use-select-language";
import { WeaponType } from "@/types/mh-common/weapon-type";

export function MhWildsWeapon() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();
  const [weaponType, setWeaponType] = useState<WeaponType>(
    "mhWilds_greatswords"
  );
  const [term, setTerm] = useState("");

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common");

  const weaponButtonGroups = [
    [
      { type: "mhWilds_greatswords", namespace: "mh_common_greatsword" },
      { type: "mhWilds_hammers", namespace: "mh_common_hammer" },
      { type: "mhWilds_hunting_horn", namespace: "mh_common_huntinghorn" },
      { type: "mhWilds_gunlances", namespace: "mh_common_gunlance" },
      { type: "mhWilds_switchaxes", namespace: "mh_common_switchaxe" },
      { type: "mhWilds_charge_blades", namespace: "mh_common_chargeblade" },
    ],
    [
      { type: "mhWilds_longswords", namespace: "mh_common_longsword" },
      { type: "mhWilds_sword_N_shield", namespace: "mh_common_swordandshield" },
      { type: "mhWilds_dualblades", namespace: "mh_common_dualblade" },
      { type: "mhWilds_lances", namespace: "mh_common_lance" },
      { type: "mhWilds_insect_glavies", namespace: "mh_common_insectglavie" },
    ],
    [
      { type: "mhWilds_bows", namespace: "mh_common_bow" },
      { type: "mhWilds_light_bowguns", namespace: "mh_common_light_bowgun" },
      { type: "mhWilds_heavy_bowguns", namespace: "mh_common_heavy_bowgun" },
    ],
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {mhWildsmhCommonNamespace?.mhWilds_planner}
      </div>

      <LanguageSelector />

      {weaponButtonGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6 flex space-x-4">
          {group.map(({ type, namespace }) => (
            <button
              key={type}
              onClick={() => setWeaponType(type as WeaponType)}
              className={`px-4 py-2 rounded ${
                weaponType === type
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {mhCommonNamespace?.[namespace]}
            </button>
          ))}
        </div>
      ))}

      <input
        type="text"
        placeholder={mhWildsmhCommonNamespace?.mhwilds_common_searchPlaceholder}
        className="mb-6 px-4 py-2 border rounded w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      {weaponType === "mhWilds_greatswords" ||
      weaponType === "mhWilds_hammers" ||
      weaponType === "mhWilds_longswords" ||
      weaponType === "mhWilds_sword_N_shield" ||
      weaponType === "mhWilds_dualblades" ||
      weaponType === "mhWilds_lances" ||
      weaponType === "mhWilds_charge_blades" ? (
        <CommonWeaponsList searchTerm={term} weaponType={weaponType} />
      ) : weaponType === "mhWilds_switchaxes" ||
        weaponType === "mhWilds_insect_glavies" ||
        weaponType === "mhWilds_bows" ? (
        <SingleResourceWeaponsList searchTerm={term} weaponType={weaponType} />
      ) : weaponType === "mhWilds_gunlances" ? (
        <GunlanceList searchTerm={term} />
      ) : weaponType === "mhWilds_hunting_horn" ? (
        <HuntingHornList searchTerm={term} />
      ) : weaponType === "mhWilds_light_bowguns" ? (
        <LightBowgunList searchTerm={term} />
      ) : weaponType === "mhWilds_heavy_bowguns" ? (
        <HeavyBowgunList searchTerm={term} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {mhWildsmhCommonNamespace?.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
