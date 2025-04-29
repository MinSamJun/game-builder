"use client";

import React from "react";
import { mhWildsGreatswordsData } from "@/data/mh-wilds/weapons";
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
};

export function WeaponCardList() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();

  const mhWildsGreatswordsNamespace = getNamespaceData("mhWilds_greatswords");
  const mhCommonNamespace = getNamespaceData("mh_common");

  const [page, setPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);

  const [selectedSkills, setSelectedSkills] = React.useState<
    Record<string, string>
  >({});
  const [isSearching, setIsSearching] = React.useState(false);

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
    const slotsValue = weapon.slots.reduce((sum, slot) => sum + slot, 0);
    const skillsValue = Object.values(weapon.skills).reduce(
      (sum, level) => sum + level,
      0
    );
    return slotsValue + skillsValue;
  };

  const weaponsWithExpectedAttack = React.useMemo(() => {
    return (mhWildsGreatswordsData as Weapon[]).map((weapon) => {
      const expectedAttack = calculateExpectedAttack(
        weapon.attack,
        weapon.affinity
      );
      const slotsAndSkillsValue = calculateSlotsAndSkillsValue(weapon);
      return { ...weapon, expectedAttack, slotsAndSkillsValue };
    });
  }, []);

  const filteredWeapons = React.useMemo(() => {
    if (!isSearching) return [];
    return weaponsWithExpectedAttack.filter((weapon) => {
      return Object.entries(selectedSkills).every(([skill, level]) => {
        return (weapon.skills[skill] ?? 0) >= Number(level);
      });
    });
  }, [selectedSkills, weaponsWithExpectedAttack, isSearching]);

  const [sortType, setSortType] = React.useState<
    "slotsAndSkillsValue" | "expectedAttack" | null
  >("slotsAndSkillsValue");

  const sortedWeapons = React.useMemo(() => {
    if (!sortType) return filteredWeapons;

    return filteredWeapons.sort((a, b) => {
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

  const handleSkillChange = (weaponName: string, skillLevel: string) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [weaponName]: skillLevel,
    }));
  };

  return (
    <div className="p-4 space-y-6">
      <LanguageSelector />

      <WeaponSkillSelector
        selectedSkills={selectedSkills}
        onSkillChange={handleSkillChange}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() =>
              setSortType(
                sortType === "slotsAndSkillsValue"
                  ? null
                  : "slotsAndSkillsValue"
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
              setSortType(
                sortType === "expectedAttack" ? null : "expectedAttack"
              )
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
      </div>

      <button
        onClick={() => setIsSearching(true)}
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
              {mhWildsGreatswordsNamespace[weapon.name] ?? weapon.name}
            </div>
            <div>
              {mhCommonNamespace.mh_common_expected_attack}:{" "}
              {weapon.expectedAttack.toFixed(2)}
            </div>
            <div>
              {mhCommonNamespace.mh_common_slots_skills_value}:{" "}
              {weapon.slotsAndSkillsValue}
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
