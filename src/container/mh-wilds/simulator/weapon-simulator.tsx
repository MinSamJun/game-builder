// src/components/mh-wilds/weapon-simulator.tsx
"use client";

import React from "react";
import {
  mhWildsGreatswordsData,
  mhWildsDualbladesData,
  mhWildsLongswordsData,
  mhWildsSwordNShieldsData,
  mhWildsHammersData,
  mhWildsHuntingHornsData,
  mhWildsLancesData,
  mhWildsGunlancesData,
  mhWildsSwitchaxesData,
  mhWildsChargebladesData,
  mhWildsInsectGlaviesData,
  mhWildsBowsData,
  mhWildsLightBowgunsData,
  mhWildsHeavyBowgunsData,
} from "@/data/mh-wilds/weapons";
import { useI18n } from "@infrastructure/user-i18n";
import { WeaponSkillSelector } from "./weapon-skill-selector";
import { useSelectLanguage } from "@/hook/common/use-select-language";
import type { MhWildsBaseWeapon } from "@/types/mh-wilds/weapon";

type Weapon = MhWildsBaseWeapon;

type WeaponType =
  | "mhWilds_greatswords"
  | "mhWilds_hammers"
  | "mhWilds_hunting_horn"
  | "mhWilds_gunlances"
  | "mhWilds_switchaxes"
  | "mhWilds_charge_blades"
  | "mhWilds_longswords"
  | "mhWilds_sword_N_shield"
  | "mhWilds_dualblades"
  | "mhWilds_lances"
  | "mhWilds_insect_glavies"
  | "mhWilds_bows"
  | "mhWilds_light_bowguns"
  | "mhWilds_heavy_bowguns";

export function WeaponSimulator() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();

  const mhCommonNamespace = getNamespaceData("mh_common");

  const [weaponType, setWeaponType] = React.useState<WeaponType>(
    "mhWilds_greatswords"
  );

  const [selectedSkills, setSelectedSkills] = React.useState<
    Record<string, string>
  >({});

  const handleSkillChange = (skillName: string, level: string) => {
    setSelectedSkills((prev) => ({ ...prev, [skillName]: level }));
  };

  const resetAllSkills = () => {
    setSelectedSkills({});
  };

  const weaponButtonGroups = [
    [
      { type: "mhWilds_greatswords", label: "mh_common_greatsword" },
      { type: "mhWilds_hammers", label: "mh_common_hammer" },
      { type: "mhWilds_hunting_horn", label: "mh_common_huntinghorn" },
      { type: "mhWilds_gunlances", label: "mh_common_gunlance" },
      { type: "mhWilds_switchaxes", label: "mh_common_switchaxe" },
      { type: "mhWilds_charge_blades", label: "mh_common_chargeblade" },
    ],
    [
      { type: "mhWilds_longswords", label: "mh_common_longsword" },
      { type: "mhWilds_sword_N_shield", label: "mh_common_swordandshield" },
      { type: "mhWilds_dualblades", label: "mh_common_dualblade" },
      { type: "mhWilds_lances", label: "mh_common_lance" },
      { type: "mhWilds_insect_glavies", label: "mh_common_insectglavie" },
    ],
    [
      { type: "mhWilds_bows", label: "mh_common_bow" },
      { type: "mhWilds_light_bowguns", label: "mh_common_light_bowgun" },
      { type: "mhWilds_heavy_bowguns", label: "mh_common_heavy_bowgun" },
    ],
  ];

  return (
    <div className="p-4 space-y-6">
      <LanguageSelector />

      {weaponButtonGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6 flex space-x-4">
          {group.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setWeaponType(type as WeaponType)}
              className={`px-4 py-2 rounded ${
                weaponType === type
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {mhCommonNamespace?.[label]}
            </button>
          ))}
        </div>
      ))}

      <WeaponSkillSelector
        selectedSkills={selectedSkills}
        onSkillChange={handleSkillChange}
        onResetAllSkills={resetAllSkills}
      />
    </div>
  );
}
