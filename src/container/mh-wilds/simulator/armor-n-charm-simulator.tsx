"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { MhWildsArmorSkillSelector } from "@/container/mh-common/skill-selector";
import { mhWildsArmorSkillData } from "@/data/mh-wilds/skills";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";
import {
  mhWildsEmptyArmorData,
  mhWildsEmptyCharmData,
} from "@/data/mh-wilds/armor-n-charms";
import type { ArmorSet, Armor } from "@/types/mh-common";
import { usePagination } from "@/hook/common/use-pagenation";
import { Pagination } from "@infrastructure/common/pagenation";
import { NoResults } from "@container/common/no-results";

export function ArmorNCharmSimulator() {
  const CATEGORIES: string[] = [
    "mhwilds_skill_type_damage",
    "mhwilds_skill_type_affinity",
    "mhwilds_skill_type_element_n_status",
    "mhwilds_skill_type_damage_reduce",
    "mhwilds_skill_type_status_reduce",
    "mhwilds_skill_type_recovery",
    "mhwilds_skill_type_resource",
    "mhwilds_skill_type_action",
    "mhwilds_skill_type_support",
    "mhwilds_skill_type_item",
    "mhwilds_skill_type_environment",
    "mhwilds_skill_type_etc",
  ];

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

  const getCombinatedSkills = (armorSet: ArmorSet): Record<string, number> => {
    const skillMap: Record<string, number> = {};

    Object.values(armorSet).forEach((armor) => {
      if (!armor?.skills) return;

      Object.entries(armor.skills as Record<string, number>).forEach(
        ([skill, level]) => {
          skillMap[skill] = (skillMap[skill] || 0) + level;
        }
      );
    });

    return skillMap;
  };

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
          {paginatedData.map((combination, index) => {
            const skills = getCombinatedSkills(combination);

            return (
              <div key={index} className="border p-4 rounded shadow space-y-2">
                <div className="p-2 border rounded">
                  {mhWildsArmorNamespace?.[combination.head.name]}
                </div>
                <div className="p-2 border rounded">
                  {mhWildsArmorNamespace?.[combination.chest.name]}
                </div>
                <div className="p-2 border rounded">
                  {mhWildsArmorNamespace?.[combination.arms.name]}
                </div>
                <div className="p-2 border rounded">
                  {mhWildsArmorNamespace?.[combination.waist.name]}
                </div>
                <div className="p-2 border rounded">
                  {mhWildsArmorNamespace?.[combination.legs.name]}
                </div>
                <div className="p-2 border rounded">
                  {mhWildsCharmNamespace?.[combination.charm.name]}
                </div>

                <div className="gap-4 text-sm mt-2 space-y-2">
                  <div className="bg-gray-800 text-white rounded p-4">
                    {Object.entries(skills).length > 0 ? (
                      CATEGORIES.map((category) => {
                        const categorizedSkills = mhWildsArmorSkillData
                          .filter(
                            (skill) =>
                              (skill.category ?? "mhwilds_skill_type_etc") ===
                              category
                          )
                          .filter((skill) => skill.name in skills);

                        if (categorizedSkills.length === 0) return null;

                        return (
                          <div className="mb-4" key={category}>
                            <div className="text-xs font-bold mb-1">
                              {getNamespaceData("mhWilds_skill_type")?.[
                                category
                              ] ?? category}
                            </div>
                            <ul>
                              {categorizedSkills.map((skill) => (
                                <li key={skill.name}>
                                  {getNamespaceData("mhWilds_armor_skill")?.[
                                    skill.name
                                  ] ?? skill.name}{" "}
                                  Lv {skills[skill.name]}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })
                    ) : (
                      <div>{mhCommonNamespace?.mh_common_none}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
