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

  const [page, setPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);

  const [selectedSkills, setSelectedSkills] = React.useState<
    Record<string, string>
  >({});

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

  const weaponsWithExpectedAttack = React.useMemo(() => {
    return (mhWildsGreatswordsData as Weapon[]).map((weapon) => {
      const expectedAttack = calculateExpectedAttack(
        weapon.attack,
        weapon.affinity
      );
      return { ...weapon, expectedAttack };
    });
  }, []);

  const filteredWeapons = React.useMemo(() => {
    return weaponsWithExpectedAttack.filter((weapon) => {
      return Object.entries(selectedSkills).every(([skill, level]) => {
        return (weapon.skills[skill] ?? 0) >= Number(level);
      });
    });
  }, [selectedSkills, weaponsWithExpectedAttack]);

  const sortedWeapons = React.useMemo(() => {
    return filteredWeapons.sort((a, b) => b.expectedAttack - a.expectedAttack);
  }, [filteredWeapons]);

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
      <div>
        {paginatedData.map((weapon) => (
          <div
            key={weapon.name}
            className="border p-4 rounded shadow space-y-2"
          >
            <div className="font-semibold">
              {mhWildsGreatswordsNamespace[weapon.name] ?? weapon.name}
            </div>
            <div>기대 공격력: {weapon.expectedAttack.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {filteredWeapons.length > paginatedData.length && (
        <button onClick={loadMoreWeapons} className="w-full p-2 border mt-4">
          더 보기
        </button>
      )}
    </div>
  );
}
