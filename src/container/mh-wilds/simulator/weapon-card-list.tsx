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
import { mhWildsWeaponSkillDecorationData } from "@/data/mh-wilds/decorations";
import { useI18n } from "@infrastructure/user-i18n";
import { WeaponSkillSelector } from "./weapon-skill-selector";
import { useSelectLanguage } from "@/hook/common/use-select-language";

type Weapon = {
  name: string;
  part: string;
  rarity: number;
  rank: string;
  attack: number;
  element: Record<string, number> | null;
  affinity: number;
  defense: number;
  slots: number[];
  skills: Record<string, number>;
  expectedAttack: number;
  slotsAndSkillsValue: number;
};

type Decoration = {
  name: string;
  type: string;
  rarity: number;
  rank: string;
  slotlevel: number;
  skills: Record<string, number>;
};

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

export function WeaponCardList() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();

  const mhCommonNamespace = getNamespaceData("mh_common");

  const [weaponType, setWeaponType] = React.useState<WeaponType>(
    "mhWilds_greatswords"
  );

  const [weaponNamespace, setWeaponNamespace] = React.useState<WeaponType>(
    "mhWilds_greatswords"
  );
  const mhWildsTargedWeaponNamespace = getNamespaceData(`${weaponNamespace}`);

  const [page, setPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);
  const [selectedSkills, setSelectedSkills] = React.useState<
    Record<string, string>
  >({});
  const [sortType, setSortType] = React.useState<
    "slotsAndSkillsValue" | "expectedAttack" | null
  >("slotsAndSkillsValue");

  const calculateExpectedAttack = (
    attack: number,
    affinity: number
  ): number => {
    if (affinity > 0) {
      return attack * (1 - affinity / 100 + (affinity / 100) * 1.25);
    } else {
      return (
        attack *
        (1 - Math.abs(affinity) / 100 + (Math.abs(affinity) / 100) * 0.75)
      );
    }
  };

  const calculateSlotsAndSkillsValue = (weapon: Weapon): number => {
    const slotValue = weapon.slots.reduce((sum, slot) => sum + slot, 0);
    const skillValue = Object.values(weapon.skills).reduce(
      (sum, level) => sum + level,
      0
    );
    return slotValue + skillValue;
  };

  const weaponsWithExpectedAttack = React.useMemo(() => {
    let weaponData: Weapon[] = [];
    switch (weaponType) {
      case "mhWilds_greatswords":
        weaponData = mhWildsGreatswordsData as Weapon[];
        break;
      case "mhWilds_dualblades":
        weaponData = mhWildsDualbladesData as Weapon[];
        break;
      case "mhWilds_longswords":
        weaponData = mhWildsLongswordsData as Weapon[];
        break;
      case "mhWilds_sword_N_shield":
        weaponData = mhWildsSwordNShieldsData as Weapon[];
        break;
      case "mhWilds_hammers":
        weaponData = mhWildsHammersData as Weapon[];
        break;
      case "mhWilds_hunting_horn":
        weaponData = mhWildsHuntingHornsData as unknown as Weapon[];
        break;
      case "mhWilds_lances":
        weaponData = mhWildsLancesData as Weapon[];
        break;
      case "mhWilds_gunlances":
        weaponData = mhWildsGunlancesData as unknown as Weapon[];
        break;
      case "mhWilds_switchaxes":
        weaponData = mhWildsSwitchaxesData as unknown as Weapon[];
        break;
      case "mhWilds_charge_blades":
        weaponData = mhWildsChargebladesData as Weapon[];
        break;
      case "mhWilds_insect_glavies":
        weaponData = mhWildsInsectGlaviesData as unknown as Weapon[];
        break;
      case "mhWilds_bows":
        weaponData = mhWildsBowsData as unknown as Weapon[];
        break;
      case "mhWilds_light_bowguns":
        weaponData = mhWildsLightBowgunsData as unknown as Weapon[];
        break;
      case "mhWilds_heavy_bowguns":
        weaponData = mhWildsHeavyBowgunsData as unknown as Weapon[];
        break;
    }

    return weaponData.map((weapon) => {
      const expectedAttack = calculateExpectedAttack(
        weapon.attack,
        weapon.affinity
      );
      const slotsAndSkillsValue = calculateSlotsAndSkillsValue(weapon);
      return { ...weapon, expectedAttack, slotsAndSkillsValue };
    });
  }, [weaponType]);

  function canFulfillSkillsWithDecorations(
    weapon: Weapon,
    selectedSkills: Record<string, string>
  ) {
    const combinedSkills = { ...weapon.skills };
    const availableSlots = [...weapon.slots].sort((a, b) => a - b);

    const remainingSkills = Object.entries(selectedSkills)
      .map(([skill, level]) => ({
        skill,
        neededLevel: Number(level) - (combinedSkills[skill] ?? 0),
      }))
      .filter((item) => item.neededLevel > 0);

    for (const slotLevel of availableSlots) {
      let bestFit: { skill: string; value: number } | null = null;

      for (const skillObj of remainingSkills) {
        const decorations = (
          mhWildsWeaponSkillDecorationData as unknown as Decoration[]
        ).filter(
          (deco) => deco.slotlevel <= slotLevel && deco.skills[skillObj.skill]
        );

        if (decorations.length > 0) {
          const bestDeco = decorations.reduce((best, deco) =>
            (deco.skills[skillObj.skill] ?? 0) >
            (best.skills[skillObj.skill] ?? 0)
              ? deco
              : best
          );

          if (
            !bestFit ||
            (bestDeco.skills[skillObj.skill] ?? 0) > bestFit.value
          ) {
            bestFit = {
              skill: skillObj.skill,
              value: bestDeco.skills[skillObj.skill] ?? 0,
            };
          }
        }
      }

      if (bestFit) {
        const targetSkill = remainingSkills.find(
          (s) => s.skill === bestFit!.skill
        );
        if (targetSkill) {
          targetSkill.neededLevel -= bestFit.value;
        }
      }
    }

    return remainingSkills.every((s) => s.neededLevel <= 0);
  }

  const [filteredWeapons, setFilteredWeapons] = React.useState<Weapon[]>([]);

  const handleSearch = () => {
    setWeaponNamespace(weaponType);
    const filtered = weaponsWithExpectedAttack.filter((weapon) => {
      return canFulfillSkillsWithDecorations(weapon, selectedSkills);
    });
    setFilteredWeapons(filtered);
    setPage(1);
  };

  const sortedWeapons = React.useMemo(() => {
    if (!sortType) return filteredWeapons;

    return [...filteredWeapons].sort((a, b) => {
      if (sortType === "expectedAttack") {
        if (b.expectedAttack !== a.expectedAttack) {
          return b.expectedAttack - a.expectedAttack;
        }
        return b.slotsAndSkillsValue - a.slotsAndSkillsValue;
      } else {
        if (b.slotsAndSkillsValue !== a.slotsAndSkillsValue) {
          return b.slotsAndSkillsValue - a.slotsAndSkillsValue;
        }
        return b.expectedAttack - a.expectedAttack;
      }
    });
  }, [filteredWeapons, sortType]);

  const paginatedData = sortedWeapons.slice(0, page * itemsPerPage);

  const loadMoreWeapons = () => {
    setPage(page + 1);
  };

  const handleSkillChange = (skillName: string, skillLevel: string) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [skillName]: skillLevel,
    }));
  };

  return (
    <div className="p-4 space-y-6">
      <LanguageSelector />

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => {
            setWeaponType("mhWilds_greatswords");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_greatswords"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_greatsword}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_hammers");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_hammers"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_hammer}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_hunting_horn");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_hunting_horn"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_huntinghorn}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_gunlances");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_gunlances"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_gunlance}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_switchaxes");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_switchaxes"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_switchaxe}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_charge_blades");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_charge_blades"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_chargeblade}
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => {
            setWeaponType("mhWilds_longswords");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_longswords"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_longsword}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_sword_N_shield");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_sword_N_shield"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_swordandshield}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_dualblades");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_dualblades"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_dualblade}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_lances");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_lances"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_lance}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_insect_glavies");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_insect_glavies"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_insectglavie}
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => {
            setWeaponType("mhWilds_bows");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_bows"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_bow}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_light_bowguns");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_light_bowguns"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_light_bowgun}
        </button>
        <button
          onClick={() => {
            setWeaponType("mhWilds_heavy_bowguns");
          }}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_heavy_bowguns"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_heavy_bowgun}
        </button>
      </div>

      <WeaponSkillSelector
        selectedSkills={selectedSkills}
        onSkillChange={handleSkillChange}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() =>
            setSortType(
              sortType === "slotsAndSkillsValue" ? null : "slotsAndSkillsValue"
            )
          }
          className={`px-3 py-1 rounded border ${
            sortType === "slotsAndSkillsValue"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {mhCommonNamespace.mh_common_slots_skills_value}
        </button>

        <button
          onClick={() =>
            setSortType(sortType === "expectedAttack" ? null : "expectedAttack")
          }
          className={`px-3 py-1 rounded border ${
            sortType === "expectedAttack"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {mhCommonNamespace.mh_common_expected_attack}
        </button>
      </div>

      <button
        onClick={handleSearch}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {mhCommonNamespace.mh_common_weapon_search}
      </button>

      <div>
        {paginatedData.map((weapon) => (
          <div
            key={weapon.name}
            className="border p-4 rounded shadow space-y-2"
          >
            <div className="font-semibold">
              {mhWildsTargedWeaponNamespace[weapon.name] ?? weapon.name}
            </div>
            <div>
              {mhCommonNamespace.mh_common_expected_attack}:{" "}
              {weapon.expectedAttack?.toFixed(2) ?? "N/A"}
            </div>
            <div>
              {mhCommonNamespace.mh_common_slots_skills_value}:{" "}
              {weapon.slotsAndSkillsValue ?? "N/A"}
            </div>
          </div>
        ))}
      </div>

      {filteredWeapons.length > paginatedData.length && (
        <button onClick={loadMoreWeapons} className="w-full p-2 border mt-4">
          {mhCommonNamespace.mh_common_next_page}
        </button>
      )}
    </div>
  );
}
