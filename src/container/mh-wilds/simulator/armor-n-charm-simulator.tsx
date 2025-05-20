"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { MhWildsArmorSkillSelector } from "@/container/mh-common/skill-selector";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";
import {
  mhWildsEmptyArmorData,
  mhWildsSlotonlyArmorData,
  mhWildsArmorData,
  mhWildsEmptyCharmData,
  mhWildsCharmData,
} from "@/data/mh-wilds/armor-n-charms";
import type { ArmorSet, Armor } from "@/types/mh-common";
import { usePagination } from "@/hook/common/use-pagenation";
import { Pagination } from "@infrastructure/common/pagenation";
import { NoResults } from "@container/common/no-results";

export function ArmorNCharmSimulator() {
  const [selectedRank, setSelectedRank] = React.useState<string | null>(
    "mh_common_high_rank"
  );

  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsArmorNamespace = getNamespaceData("mhWilds_armor");
  const mhWildsCharmNamespace = getNamespaceData("mhWilds_charm");

  const [selectedSkills, setSelectedSkills] = React.useState<
    Record<string, string>
  >({});

  const [armorCombinations, setArmorCombinations] = React.useState<ArmorSet[]>(
    []
  );

  const itemsPerPage = 10;
  const { page, setPage, paginatedData, nextPage, prevPage } = usePagination(
    armorCombinations,
    itemsPerPage
  );

  React.useEffect(() => {
    setPage(1);
  }, [armorCombinations, setPage]);

  const handleSkillChange = (skillName: string, level: string) => {
    setSelectedSkills((prev) => ({ ...prev, [skillName]: level }));
  };

  const resetAllSkills = () => {
    setSelectedSkills({});
  };

  const handleSearch = () => {
    const result = getAllArmorNCharmCombinations();
    setArmorCombinations(result);
  };

  const rankSelector = useMhSelectRank(selectedRank, setSelectedRank, {
    showMasterRank: false,
    isFinalOnly: false,
  });

  const getAllArmorNCharmCombinations = (): ArmorSet[] => {
    const hasSelectedSkills = Object.entries(selectedSkills).some(
      ([, level]) => level && level !== "---"
    );

    if (hasSelectedSkills) {
      return [];
    }

    const mhwilds_armor_parts = [
      "mhwilds_head",
      "mhwilds_chest",
      "mhwilds_arms",
      "mhwilds_waist",
      "mhwilds_legs",
    ];

    const armorData = mhWildsEmptyArmorData;
    const charmData = mhWildsEmptyCharmData;

    const availableArmors = mhwilds_armor_parts.map((part) => {
      return armorData.filter(
        (armor) => armor.part === part && armor.rank === selectedRank
      );
    });

    const [headArmors, chestArmors, armArmors, waistArmors, legArmors] =
      availableArmors;

    const emptyCharms = charmData.filter(
      (charm) => charm.rank === selectedRank
    );

    if (emptyCharms.length === 0) {
      return [];
    }

    const combinations: ArmorSet[] = [];

    emptyCharms.forEach((charm) => {
      headArmors.forEach((head) => {
        chestArmors.forEach((chest) => {
          armArmors.forEach((arms) => {
            waistArmors.forEach((waist) => {
              legArmors.forEach((legs) => {
                combinations.push({
                  charm: charm as Armor,
                  head: head as Armor,
                  chest: chest as Armor,
                  arms: arms as Armor,
                  waist: waist as Armor,
                  legs: legs as Armor,
                });
              });
            });
          });
        });
      });
    });

    return combinations;
  };

  return (
    <div className="p-4 space-y-6">
      <MhWildsArmorSkillSelector
        selectedSkills={selectedSkills}
        onSkillChange={handleSkillChange}
        onResetAllSkills={resetAllSkills}
      />
      {rankSelector}

      <div className="mb-4">
        <button
          onClick={handleSearch}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {mhCommonNamespace?.mh_common_armor_search}
        </button>
      </div>

      {armorCombinations.length === 0 ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {paginatedData.map((combination, index) => (
            <div key={index} className="border p-4 rounded shadow space-y-2">
              <div className="p-2 border rounded">
                {mhWildsArmorNamespace?.[combination.head.name]}
                {combination.head.name}
              </div>
              <div className="p-2 border rounded">
                {mhWildsArmorNamespace?.[combination.chest.name]}
                {combination.chest.name}
              </div>
              <div className="p-2 border rounded">
                {mhWildsArmorNamespace?.[combination.arms.name]}
                {combination.arms.name}
              </div>
              <div className="p-2 border rounded">
                {mhWildsArmorNamespace?.[combination.waist.name]}
                {combination.waist.name}
              </div>
              <div className="p-2 border rounded">
                {mhWildsArmorNamespace?.[combination.legs.name]}
                {combination.legs.name}
              </div>
              <div className="p-2 border rounded">
                {mhWildsCharmNamespace?.[combination.charm.name]}
                {combination.charm.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {armorCombinations.length > itemsPerPage && (
        <Pagination
          currentPage={page}
          totalItems={armorCombinations.length}
          itemsPerPage={itemsPerPage}
          onPrev={prevPage}
          onNext={nextPage}
        />
      )}
    </div>
  );
}
