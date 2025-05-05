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
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";
import type { MhWildsBaseWeapon } from "@/types/mh-wilds";
import type { WeaponType } from "@/types/mh-common";
import { NoResults } from "@container/common/no-results";
import { usePagination } from "@/hook/common/use-pagenation";
import { Pagination } from "@infrastructure/common/pagenation";

type Weapon = MhWildsBaseWeapon;

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
  mhWilds_greatswords: mhWildsGreatswordsData as Weapon[],
  mhWilds_hammers: mhWildsHammersData as Weapon[],
  mhWilds_hunting_horn: mhWildsHuntingHornsData as Weapon[],
  mhWilds_gunlances: mhWildsGunlancesData as Weapon[],
  mhWilds_switchaxes: mhWildsSwitchaxesData as Weapon[],
  mhWilds_charge_blades: mhWildsChargebladesData as Weapon[],
  mhWilds_longswords: mhWildsLongswordsData as Weapon[],
  mhWilds_sword_N_shield: mhWildsSwordNShieldsData as Weapon[],
  mhWilds_dualblades: mhWildsDualbladesData as Weapon[],
  mhWilds_lances: mhWildsLancesData as Weapon[],
  mhWilds_insect_glavies: mhWildsInsectGlaviesData as Weapon[],
  mhWilds_bows: mhWildsBowsData as Weapon[],
  mhWilds_light_bowguns: mhWildsLightBowgunsData as Weapon[],
  mhWilds_heavy_bowguns: mhWildsHeavyBowgunsData as Weapon[],
};

export function WeaponSimulator() {
  const [weaponType, setWeaponType] = React.useState<WeaponType>(
    "mhWilds_greatswords"
  );
  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);
  const [isFinalOnly, setIsFinalOnly] = React.useState(false);
  const [isSearched, setIsSearched] = React.useState(false);
  const [searchSkills, setSearchSkills] = React.useState<
    Record<string, string>
  >({});
  const [page, setPage] = React.useState(1);

  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsWeaponNamespace = getNamespaceData(
    weaponNamespaceMap[weaponType]
  );
  const useMhWildsListNamespace = getNamespaceData("mhWilds_weapon_skill");

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

  const filteredWeaponData = React.useMemo(() => {
    if (!isSearched) return [];

    return weaponTypeToDataMap[weaponType].filter((weapon) => {
      const matchRank = !selectedRank || weapon.rank === selectedRank;
      const matchFinal =
        !isFinalOnly || weapon.rarity === 4 || weapon.rarity === 8;

      const matchSkills =
        Object.keys(searchSkills).length === 0 ||
        Object.entries(searchSkills).every(([skillName, levelStr]) => {
          if (!levelStr) return true;
          const requiredLevel = parseInt(levelStr, 10);
          const weaponLevel = weapon.skills?.[skillName] ?? 0;
          return weaponLevel >= requiredLevel;
        });

      return matchRank && matchFinal && matchSkills;
    });
  }, [weaponType, isFinalOnly, selectedRank, searchSkills, isSearched]);

  const itemsPerPage = 10;
  const { paginatedData, nextPage, prevPage } = usePagination(
    filteredWeaponData,
    itemsPerPage
  );

  React.useEffect(() => {
    setIsSearched(false);
    setPage(1);
  }, [weaponType]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (newPage > page) {
      nextPage();
    } else {
      prevPage();
    }
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

      {useMhSelectRank(selectedRank, setSelectedRank, {
        showMasterRank: false,
        isFinalOnly,
        setIsFinalOnly,
      })}

      <div className="mb-4">
        <button
          onClick={handleSearch}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {mhCommonNamespace?.mh_common_weapon_search}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {paginatedData.map((weapon) => (
          <div
            key={weapon.name}
            className="border p-4 rounded shadow space-y-2"
          >
            <div key={weapon.name} className="p-2 border rounded">
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
            <div className="gap-4 text-sm mt-2">
              <div className="bg-gray-800 text-white rounded p-4">
                {weapon.skills && Object.entries(weapon.skills).length > 0 ? (
                  Object.entries(weapon.skills).map(([key, level]) => {
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
            </div>
          </div>
        ))}
      </div>

      {filteredWeaponData.length === 0 && isSearched ? (
        <NoResults />
      ) : (
        filteredWeaponData.length > itemsPerPage && (
          <Pagination
            currentPage={page}
            totalItems={filteredWeaponData.length}
            itemsPerPage={itemsPerPage}
            onPrev={() => handlePageChange(page - 1)}
            onNext={() => handlePageChange(page + 1)}
          />
        )
      )}
    </div>
  );
}
