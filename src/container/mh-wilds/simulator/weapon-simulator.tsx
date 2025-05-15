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
import { MhWildsWeaponSkillSelector } from "@/container/mh-common/skill-selector";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";
import type { MhCommonBaseWeapon } from "@/types/mh-common";
import type { WeaponType } from "@/types/mh-common";
import { NoResults } from "@container/common/no-results";
import { usePagination } from "@/hook/common/use-pagenation";
import { Pagination } from "@infrastructure/common/pagenation";
import { mhWildsWeaponSkillDecorationData } from "@/data/mh-wilds/decorations";
import {
  calculateDecorationCombinations,
  calculateTotalSkills,
} from "@mh-common/decoration-calculator";

type Weapon = MhCommonBaseWeapon;

const weaponNamespaceMap: Record<WeaponType, WeaponType> = {
  mhWilds_greatswords: "mhWilds_greatswords",
  mhWilds_hammers: "mhWilds_hammers",
  mhWilds_hunting_horn: "mhWilds_hunting_horn",
  mhWilds_gunlances: "mhWilds_gunlances",
  mhWilds_switchaxes: "mhWilds_switchaxes",
  mhWilds_charge_blades: "mhWilds_charge_blades",
  mhWilds_longswords: "mhWilds_longswords",
  mhWilds_sword_N_shield: "mhWilds_sword_N_shield",
  mhWilds_dualblades: "mhWilds_dualblades",
  mhWilds_lances: "mhWilds_lances",
  mhWilds_insect_glavies: "mhWilds_insect_glavies",
  mhWilds_bows: "mhWilds_bows",
  mhWilds_light_bowguns: "mhWilds_light_bowguns",
  mhWilds_heavy_bowguns: "mhWilds_heavy_bowguns",
};

const weaponTypeToDataMap: Record<WeaponType, Weapon[]> = {
  mhWilds_greatswords: mhWildsGreatswordsData,
  mhWilds_hammers: mhWildsHammersData,
  mhWilds_hunting_horn: mhWildsHuntingHornsData,
  mhWilds_gunlances: mhWildsGunlancesData,
  mhWilds_switchaxes: mhWildsSwitchaxesData,
  mhWilds_charge_blades: mhWildsChargebladesData,
  mhWilds_longswords: mhWildsLongswordsData,
  mhWilds_sword_N_shield: mhWildsSwordNShieldsData,
  mhWilds_dualblades: mhWildsDualbladesData,
  mhWilds_lances: mhWildsLancesData,
  mhWilds_insect_glavies: mhWildsInsectGlaviesData,
  mhWilds_bows: mhWildsBowsData,
  mhWilds_light_bowguns: mhWildsLightBowgunsData,
  mhWilds_heavy_bowguns: mhWildsHeavyBowgunsData,
};

export function WeaponSimulator() {
  const [weaponType, setWeaponType] = React.useState<WeaponType>(
    "mhWilds_greatswords"
  );
  const [selectedRank, setSelectedRank] = React.useState<string | null>(
    "mh_common_high_rank"
  );
  const [isFinalOnly, setIsFinalOnly] = React.useState(true);
  const [isSearched, setIsSearched] = React.useState(false);
  const [searchSkills, setSearchSkills] = React.useState<
    Record<string, string>
  >({});
  const [excludeComplexDeco, setExcludeComplexDeco] = React.useState(false);

  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsWeaponNamespace = getNamespaceData(
    weaponNamespaceMap[weaponType]
  );
  const useMhWildsListNamespace = getNamespaceData("mhWilds_weapon_skill");
  const mhWildsWeaponDecorationNamespace = getNamespaceData(
    "mhWilds_weapon_decoration"
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

  const handleSearch = () => {
    setSearchSkills(selectedSkills);
    setIsSearched(true);
  };

  const decorations = React.useMemo(() => {
    if (excludeComplexDeco) {
      return mhWildsWeaponSkillDecorationData.filter(
        (deco) => Object.keys(deco.skills).length <= 1
      );
    }
    return mhWildsWeaponSkillDecorationData;
  }, [excludeComplexDeco]);

  const numericSearchSkills = React.useMemo(() => {
    const result: Record<string, number> = {};
    Object.entries(searchSkills).forEach(([skill, level]) => {
      if (level) {
        result[skill] = parseInt(level, 10);
      }
    });
    return result;
  }, [searchSkills]);

  const filteredWeaponData = React.useMemo(() => {
    if (!isSearched) return [];

    return weaponTypeToDataMap[weaponType].filter((weapon) => {
      const matchRank = !selectedRank || weapon.rank === selectedRank;
      const matchFinal = !isFinalOnly || weapon.final;

      if (Object.keys(numericSearchSkills).length === 0) {
        return matchRank && matchFinal;
      }

      const decorationCombinations = calculateDecorationCombinations(
        weapon.slots,
        decorations,
        numericSearchSkills,
        weapon.skills
      );

      const hasMatchingCombination = decorationCombinations.length > 0;

      return matchRank && matchFinal && hasMatchingCombination;
    });
  }, [
    weaponType,
    isFinalOnly,
    selectedRank,
    numericSearchSkills,
    isSearched,
    decorations,
  ]);

  const itemsPerPage = 10;
  const { page, setPage, paginatedData, nextPage, prevPage } = usePagination(
    filteredWeaponData,
    itemsPerPage
  );

  React.useEffect(() => {
    setPage(1);
  }, [filteredWeaponData, setPage]);

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

  const rankSelector = useMhSelectRank(selectedRank, setSelectedRank, {
    showMasterRank: false,
    isFinalOnly,
    setIsFinalOnly,
  });

  return (
    <div className="p-4 space-y-6">
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

      <MhWildsWeaponSkillSelector
        selectedSkills={selectedSkills}
        onSkillChange={handleSkillChange}
        onResetAllSkills={resetAllSkills}
      />

      {rankSelector}

      <div className="flex items-center gap-2 text-sm mb-4">
        <label
          htmlFor="excludeComplexDecoCheckbox"
          className="flex items-center gap-2"
        >
          <input
            id="excludeComplexDecoCheckbox"
            type="checkbox"
            checked={excludeComplexDeco}
            onChange={() => setExcludeComplexDeco((prev) => !prev)}
          />
          {mhCommonNamespace?.mh_common_exclude_complex_deco}
        </label>
      </div>

      <div className="mb-4">
        <button
          onClick={handleSearch}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {mhCommonNamespace?.mh_common_weapon_search}
        </button>
      </div>

      {filteredWeaponData.length === 0 && isSearched ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {paginatedData.map((weapon) => {
            const decorationCombinations = calculateDecorationCombinations(
              weapon.slots,
              decorations,
              numericSearchSkills,
              weapon.skills
            );

            const firstCombination = decorationCombinations[0] || [];
            const totalSkills = calculateTotalSkills(weapon, firstCombination);

            return (
              <div
                key={weapon.name}
                className="border p-4 rounded shadow space-y-2"
              >
                <div className="p-2 border rounded">
                  {mhWildsWeaponNamespace?.[weapon.name]}
                  {weapon.slots.length > 0 && (
                    <>
                      {" "}
                      <span className="text-xs text-gray-500">
                        {weapon.slots.join(" / ")}
                      </span>
                    </>
                  )}
                </div>
                <div className="gap-4 text-sm mt-2 space-y-2">
                  <div className="bg-gray-800 text-white rounded p-4">
                    {Object.entries(totalSkills).length > 0 ? (
                      Object.entries(totalSkills).map(([key, level]) => {
                        const skillName = useMhWildsListNamespace[key] ?? key;
                        return (
                          <div key={key}>
                            {skillName} Lv{level}
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
                          const remainingSlots = [...weapon.slots];

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

                          return (
                            <div
                              key={index}
                              className="bg-gray-700 text-white rounded p-4"
                            >
                              <div className="text-xs text-gray-400 mb-2">
                                {remainingSlots
                                  .map((slot) => (slot === -1 ? "x" : slot))
                                  .join(" / ")}
                              </div>
                              {Object.entries(decorationCounts).map(
                                ([name, count]) => (
                                  <div key={name}>
                                    {mhWildsWeaponDecorationNamespace?.[name] ??
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

      {filteredWeaponData.length > itemsPerPage && (
        <Pagination
          currentPage={page}
          totalItems={filteredWeaponData.length}
          itemsPerPage={itemsPerPage}
          onPrev={prevPage}
          onNext={nextPage}
        />
      )}
    </div>
  );
}
