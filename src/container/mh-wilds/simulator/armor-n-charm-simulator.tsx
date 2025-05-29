"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { MhWildsArmorSkillSelector } from "@/container/mh-common/skill-selector";
import { mhWildsArmorSkillData } from "@/data/mh-wilds/skills";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";
import {
  mhWildsEmptyArmorData,
  mhWildsEmptyCharmData,
  mhWildsArmorData,
  mhWildsCharmData,
  mhWildsSlotonlyArmorData,
} from "@/data/mh-wilds/armor-n-charms";
import { mhWildsArmorSkillDecorationData } from "@/data/mh-wilds/decorations";
import type { ArmorSet, Armor } from "@/types/mh-common";
import { usePagination } from "@/hook/common/use-pagenation";
import { Pagination } from "@infrastructure/common/pagenation";
import { NoResults } from "@container/common/no-results";
import { calculateDecorationCombinations } from "@/utils/mh-wilds/decoration-calculator";

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
  const mhWildsArmorDecorationNamespace = getNamespaceData(
    "mhWilds_armor_decoration"
  );

  const [selectedSkills, setSelectedSkills] = React.useState<
    Record<string, string>
  >({});

  const [armorCombinations, setArmorCombinations] = React.useState<ArmorSet[]>(
    []
  );

  const decorations = React.useMemo(() => {
    return mhWildsArmorSkillDecorationData;
  }, []);

  const numericSearchSkills = React.useMemo(() => {
    const result: Record<string, number> = {};
    Object.entries(selectedSkills).forEach(([skill, level]) => {
      if (level) {
        result[skill] = parseInt(level, 10);
      }
    });
    return result;
  }, [selectedSkills]);

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

    const mhwilds_armor_parts = [
      "mhwilds_head",
      "mhwilds_chest",
      "mhwilds_arms",
      "mhwilds_waist",
      "mhwilds_legs",
    ];

    const armorData = selectedRank
      ? mhWildsArmorData.filter((armor) => armor.rank === selectedRank)
      : [...mhWildsArmorData, ...mhWildsSlotonlyArmorData];

    const charmData = hasSelectedSkills
      ? mhWildsCharmData
      : mhWildsEmptyCharmData;

    const emptyArmor = mhWildsEmptyArmorData.find(
      (armor) =>
        armor.part === "mhwilds_head" &&
        (selectedRank
          ? armor.rank === selectedRank
          : armor.rank === "mh_common_low_rank")
    ) as Armor;

    const availableArmors = mhwilds_armor_parts.map((part) => {
      const matchingArmors = armorData.filter(
        (armor) =>
          armor.part === part && (!selectedRank || armor.rank === selectedRank)
      );

      return matchingArmors.slice(0, 3);
    });

    const [headArmors, chestArmors, armArmors, waistArmors, legArmors] =
      availableArmors;

    let filteredCharms = charmData.filter(
      (charm) => !selectedRank || charm.rank === selectedRank
    );

    if (hasSelectedSkills) {
      filteredCharms = filteredCharms.filter((charm) => {
        const charmSkills = charm.skills || {};
        return Object.entries(selectedSkills).every(([skill, level]) => {
          if (!level || level === "---") return true;
          const requiredLevel = parseInt(level);
          const charmSkillLevel = charmSkills[skill] || 0;
          return charmSkillLevel >= requiredLevel;
        });
      });
    }

    if (filteredCharms.length === 0) {
      return [];
    }

    const combinations: ArmorSet[] = [];

    const satisfiesSkillRequirements = (armorSet: ArmorSet): boolean => {
      if (!hasSelectedSkills) return true;

      const skills = getCombinatedSkills(armorSet);
      const allSlots = [
        ...(armorSet.head.slots || []),
        ...(armorSet.chest.slots || []),
        ...(armorSet.arms.slots || []),
        ...(armorSet.waist.slots || []),
        ...(armorSet.legs.slots || []),
      ];

      const decorationCombinations = calculateDecorationCombinations(
        allSlots,
        decorations,
        numericSearchSkills,
        skills
      );

      if (decorationCombinations.length === 0) return false;

      const firstCombination = decorationCombinations[0];
      const totalSkills = { ...skills };

      firstCombination.forEach((deco) => {
        Object.entries(deco.skills).forEach(([skill, level]) => {
          totalSkills[skill] = (totalSkills[skill] || 0) + level;
        });
      });

      return Object.entries(selectedSkills).every(([skill, level]) => {
        if (!level || level === "---") return true;
        const requiredLevel = parseInt(level);
        const totalSkillLevel = totalSkills[skill] || 0;
        return totalSkillLevel >= requiredLevel;
      });
    };

    if (hasSelectedSkills) {
      const armorSets = [
        { part: "head" as const, armors: headArmors },
        { part: "chest" as const, armors: chestArmors },
        { part: "arms" as const, armors: armArmors },
        { part: "waist" as const, armors: waistArmors },
        { part: "legs" as const, armors: legArmors },
      ];

      armorSets.forEach(({ part, armors }) => {
        armors.forEach((armor) => {
          const combination: ArmorSet = {
            charm: mhWildsEmptyCharmData[0] as Armor,
            head: emptyArmor,
            chest: emptyArmor,
            arms: emptyArmor,
            waist: emptyArmor,
            legs: emptyArmor,
          };

          combination[part] = armor as Armor;
          if (satisfiesSkillRequirements(combination)) {
            combinations.push(combination);
          }
        });
      });
    }

    filteredCharms.forEach((charm) => {
      const combination: ArmorSet = {
        charm: charm as Armor,
        head: emptyArmor,
        chest: emptyArmor,
        arms: emptyArmor,
        waist: emptyArmor,
        legs: emptyArmor,
      };

      if (satisfiesSkillRequirements(combination)) {
        combinations.push(combination);
      }
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
            const allSlots = [
              ...(combination.head.slots || []),
              ...(combination.chest.slots || []),
              ...(combination.arms.slots || []),
              ...(combination.waist.slots || []),
              ...(combination.legs.slots || []),
            ];
            const decorationCombinations = calculateDecorationCombinations(
              allSlots,
              decorations,
              numericSearchSkills,
              skills
            );

            return (
              <div key={index} className="border p-4 rounded shadow space-y-2">
                <div className="p-2 border rounded">
                  {mhCommonNamespace?.mh_common_head} :{" "}
                  {mhWildsArmorNamespace?.[combination.head.name]}
                  {(combination.head.slots || []).length > 0 && (
                    <>
                      {" "}
                      <span className="text-xs text-gray-500">
                        {(combination.head.slots || []).join(" / ")}
                      </span>
                    </>
                  )}
                </div>
                <div className="p-2 border rounded">
                  {mhCommonNamespace?.mh_common_chest} :{" "}
                  {mhWildsArmorNamespace?.[combination.chest.name]}
                  {(combination.chest.slots || []).length > 0 && (
                    <>
                      {" "}
                      <span className="text-xs text-gray-500">
                        {(combination.chest.slots || []).join(" / ")}
                      </span>
                    </>
                  )}
                </div>
                <div className="p-2 border rounded">
                  {mhCommonNamespace?.mh_common_arms} :{" "}
                  {mhWildsArmorNamespace?.[combination.arms.name]}
                  {(combination.arms.slots || []).length > 0 && (
                    <>
                      {" "}
                      <span className="text-xs text-gray-500">
                        {(combination.arms.slots || []).join(" / ")}
                      </span>
                    </>
                  )}
                </div>
                <div className="p-2 border rounded">
                  {mhCommonNamespace?.mh_common_waist} :{" "}
                  {mhWildsArmorNamespace?.[combination.waist.name]}
                  {(combination.waist.slots || []).length > 0 && (
                    <>
                      {" "}
                      <span className="text-xs text-gray-500">
                        {(combination.waist.slots || []).join(" / ")}
                      </span>
                    </>
                  )}
                </div>
                <div className="p-2 border rounded">
                  {mhCommonNamespace?.mh_common_legs} :{" "}
                  {mhWildsArmorNamespace?.[combination.legs.name]}
                </div>
                <div className="p-2 border rounded">
                  {mhCommonNamespace?.mh_common_charm} :{" "}
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
                  {decorationCombinations.length > 0 &&
                    decorationCombinations[0].length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {decorationCombinations.map((combination, index) => {
                          const decorationCounts = combination.reduce(
                            (acc, dec) => {
                              acc[dec.name] = (acc[dec.name] || 0) + 1;
                              return acc;
                            },
                            {} as Record<string, number>
                          );

                          const usedSlots = combination.map(
                            (dec) => dec.slotlevel
                          );
                          const remainingSlots = [...allSlots];

                          const slotGroups = usedSlots.reduce(
                            (acc, slotLevel) => {
                              acc[slotLevel] = (acc[slotLevel] || 0) + 1;
                              return acc;
                            },
                            {} as Record<number, number>
                          );

                          Object.entries(slotGroups).forEach(
                            ([slotLevel, count]) => {
                              const level = parseInt(slotLevel);
                              const availableSlots = remainingSlots
                                .map((slot, index) => ({ slot, index }))
                                .filter(({ slot }) => slot >= level)
                                .sort((a, b) => a.slot - b.slot);

                              for (
                                let i = 0;
                                i < count && i < availableSlots.length;
                                i++
                              ) {
                                remainingSlots[availableSlots[i].index] = -1;
                              }
                            }
                          );

                          const remainingSlotCounts = remainingSlots.reduce(
                            (acc, slot) => {
                              if (slot > 0) {
                                acc[slot] = (acc[slot] || 0) + 1;
                              }
                              return acc;
                            },
                            {} as Record<number, number>
                          );

                          return (
                            <div
                              key={index}
                              className="bg-gray-700 text-white rounded p-4"
                            >
                              <div className="text-xs text-gray-400 mb-2">
                                {[3, 2, 1].map((level) => (
                                  <span key={level} className="mr-2">
                                    Lv {level} :{" "}
                                    {remainingSlotCounts[level] || "x"}
                                    {level !== 1 && " | "}
                                  </span>
                                ))}
                              </div>
                              {Object.entries(decorationCounts).map(
                                ([name, count]) => (
                                  <div key={name}>
                                    {mhWildsArmorDecorationNamespace?.[name] ??
                                      name}{" "}
                                    x{count}
                                  </div>
                                )
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
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
