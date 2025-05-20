"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { MhWildsArmorSkillSelector } from "@/container/mh-common/skill-selector";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";
import {
  mhWildsArmorData,
  mhWildsCharmData,
  mhWildsEmptyArmorData,
  mhWildsEmptyCharmData,
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
    const headArmors = mhWildsArmorData.filter(
      (armor) => armor.part === "mhwilds_head" && armor.rank === selectedRank
    );
    const chestArmors = mhWildsArmorData.filter(
      (armor) => armor.part === "mhwilds_chest" && armor.rank === selectedRank
    );
    const armArmors = mhWildsArmorData.filter(
      (armor) => armor.part === "mhwilds_arms" && armor.rank === selectedRank
    );
    const waistArmors = mhWildsArmorData.filter(
      (armor) => armor.part === "mhwilds_waist" && armor.rank === selectedRank
    );
    const legArmors = mhWildsArmorData.filter(
      (armor) => armor.part === "mhwilds_legs" && armor.rank === selectedRank
    );
    const charms = mhWildsCharmData.filter(
      (charm) => charm.rank === selectedRank
    );

    const result: ArmorSet[] = [];
    const maxCombinations = 15;

    //for (const charm of charms) {
    // for (const chest of chestArmors) {
    //   for (const arms of armArmors) {
    //     for (const waist of waistArmors) {
    //       for (const legs of legArmors) {
    //         for (const head of headArmors) {
    //           result.push({
    //             charm: charm as Armor,
    //             head: head as Armor,
    //             chest: chest as Armor,
    //             arms: arms as Armor,
    //             waist: waist as Armor,
    //             legs: legs as Armor,
    //           });
    //         }
    //       }
    //     }
    //   }
    // }
    for (let i = 0; i < maxCombinations; i++) {
      const head = headArmors[Math.floor(Math.random() * headArmors.length)];
      const chest = chestArmors[Math.floor(Math.random() * chestArmors.length)];
      const arms = armArmors[Math.floor(Math.random() * armArmors.length)];
      const waist = waistArmors[Math.floor(Math.random() * waistArmors.length)];
      const legs = legArmors[Math.floor(Math.random() * legArmors.length)];
      const charm = charms[Math.floor(Math.random() * charms.length)];

      result.push({
        head: head as Armor,
        chest: chest as Armor,
        arms: arms as Armor,
        waist: waist as Armor,
        legs: legs as Armor,
        charm: charm as Armor,
      });
    }

    return result;
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
                <div className="font-bold">{combination.head.name}</div>
              </div>
              <div className="p-2 border rounded">
                <div className="font-bold">{combination.chest.name}</div>
              </div>
              <div className="p-2 border rounded">
                <div className="font-bold">{combination.arms.name}</div>
              </div>
              <div className="p-2 border rounded">
                <div className="font-bold">{combination.waist.name}</div>
              </div>
              <div className="p-2 border rounded">
                <div className="font-bold">{combination.legs.name}</div>
              </div>
              <div className="p-2 border rounded">
                <div className="font-bold">{combination.charm.name}</div>
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
