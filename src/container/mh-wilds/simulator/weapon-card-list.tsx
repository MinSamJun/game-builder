"use client";

import React from "react";
import { mhWildsGreatswordsData } from "@/data/mh-wilds/weapons";
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
    return (mhWildsGreatswordsData as Weapon[]).map((weapon) => {
      const expectedAttack = calculateExpectedAttack(
        weapon.attack,
        weapon.affinity
      );
      const slotsAndSkillsValue = calculateSlotsAndSkillsValue(weapon);
      return { ...weapon, expectedAttack, slotsAndSkillsValue };
    });
  }, []);

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
              {mhWildsGreatswordsNamespace[weapon.name] ?? weapon.name}
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
