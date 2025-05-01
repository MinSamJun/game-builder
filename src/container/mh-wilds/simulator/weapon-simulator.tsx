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
  skills: {
    [key: string]: number | undefined;
  };
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

export function WeaponSimulator() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsWeaponSkillNamespace = getNamespaceData("mhWilds_weapon_skill");
  const mhWildsWeaponDecorationNamespace = getNamespaceData(
    "mhWilds_weapon_decoration"
  );

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
  const [isFinalOnly, setIsFinalOnly] = React.useState(true);
  const [useMaxDecorations, setUseMaxDecorations] = React.useState(false);

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
    const totalSlots = weapon.slots.reduce((sum, slot) => sum + slot, 0);
    const usedSlots = Object.values(weapon.skills).reduce(
      (sum, level) => sum + level,
      0
    );
    return totalSlots - usedSlots;
  };

  const weaponsWithExpectedAttack = React.useMemo(() => {
    const weaponDataMap: Record<WeaponType, Weapon[]> = {
      mhWilds_greatswords: mhWildsGreatswordsData as Weapon[],
      mhWilds_dualblades: mhWildsDualbladesData as Weapon[],
      mhWilds_longswords: mhWildsLongswordsData as Weapon[],
      mhWilds_sword_N_shield: mhWildsSwordNShieldsData as Weapon[],
      mhWilds_hammers: mhWildsHammersData as Weapon[],
      mhWilds_hunting_horn: mhWildsHuntingHornsData as unknown as Weapon[],
      mhWilds_lances: mhWildsLancesData as Weapon[],
      mhWilds_gunlances: mhWildsGunlancesData as unknown as Weapon[],
      mhWilds_switchaxes: mhWildsSwitchaxesData as unknown as Weapon[],
      mhWilds_charge_blades: mhWildsChargebladesData as Weapon[],
      mhWilds_insect_glavies: mhWildsInsectGlaviesData as unknown as Weapon[],
      mhWilds_bows: mhWildsBowsData as unknown as Weapon[],
      mhWilds_light_bowguns: mhWildsLightBowgunsData as unknown as Weapon[],
      mhWilds_heavy_bowguns: mhWildsHeavyBowgunsData as unknown as Weapon[],
    };

    const weaponData = weaponDataMap[weaponType] || [];

    return weaponData
      .filter((weapon) => !isFinalOnly || weapon.rarity === 8)
      .map((weapon) => {
        const expectedAttack = calculateExpectedAttack(
          weapon.attack,
          weapon.affinity
        );
        const slotsAndSkillsValue = calculateSlotsAndSkillsValue(weapon);
        return { ...weapon, expectedAttack, slotsAndSkillsValue };
      });
  }, [weaponType, isFinalOnly]);

  function canFulfillSkillsWithDecorations(
    weapon: Weapon,
    selectedSkills: Record<string, string>
  ) {
    const combinedSkills = { ...weapon.skills };
    const availableSlots = [...weapon.slots].sort((a, b) => b - a);
    const usedDecorations: {
      skill: string;
      level: number;
      slotLevel: number;
    }[] = [];

    const remainingSkills = Object.entries(selectedSkills)
      .map(([skill, level]) => ({
        skill,
        neededLevel: Number(level) - (combinedSkills[skill] ?? 0),
      }))
      .filter((item) => item.neededLevel > 0);

    for (const skillObj of remainingSkills) {
      if (skillObj.neededLevel <= 0) continue;

      const decorations = (
        mhWildsWeaponSkillDecorationData as unknown as Decoration[]
      )
        .filter((deco) => deco.skills[skillObj.skill])
        .sort((a, b) =>
          useMaxDecorations
            ? (b.skills[skillObj.skill] ?? 0) - (a.skills[skillObj.skill] ?? 0)
            : (a.skills[skillObj.skill] ?? 0) - (b.skills[skillObj.skill] ?? 0)
        );

      for (const deco of decorations) {
        const skillLevel = deco.skills[skillObj.skill] ?? 0;
        if (skillLevel === 0) continue;

        const slotIndex = availableSlots.findIndex(
          (slot) => slot >= deco.slotlevel
        );

        if (slotIndex !== -1) {
          const slotLevel = availableSlots[slotIndex];
          usedDecorations.push({
            skill: skillObj.skill,
            level: skillLevel,
            slotLevel: slotLevel,
          });
          availableSlots.splice(slotIndex, 1);
          skillObj.neededLevel -= skillLevel;
          if (skillObj.neededLevel <= 0) break;
        }
      }
    }

    return {
      canFulfill: remainingSkills.every((s) => s.neededLevel <= 0),
      usedDecorations,
    };
  }

  const [filteredWeapons, setFilteredWeapons] = React.useState<Weapon[]>([]);
  const [weaponDecorations, setWeaponDecorations] = React.useState<
    Record<string, { skill: string; level: number; slotLevel: number }[]>
  >({});

  const handleSearch = () => {
    setWeaponNamespace(weaponType);
    const filtered = weaponsWithExpectedAttack.filter((weapon) => {
      const result = canFulfillSkillsWithDecorations(weapon, selectedSkills);
      if (result.canFulfill) {
        setWeaponDecorations((prev) => ({
          ...prev,
          [weapon.name]: result.usedDecorations,
        }));
      }
      return result.canFulfill;
    });
    setFilteredWeapons(filtered);
    setPage(1);
  };

  const calculateRemainingSlots = (weapon: Weapon): number => {
    const totalSlots = weapon.slots.reduce((sum, slot) => sum + slot, 0);
    const usedSlots =
      weaponDecorations[weapon.name]?.reduce(
        (sum, deco) => sum + deco.slotLevel,
        0
      ) ?? 0;
    return totalSlots - usedSlots;
  };

  const getAvailableSlots = (weapon: Weapon): (number | "X")[] => {
    const slots = [...weapon.slots].sort((a, b) => b - a);
    const usedDecorations = weaponDecorations[weapon.name] || [];

    const usedSlots = new Array(slots.length).fill(false);

    for (const deco of usedDecorations) {
      for (let i = 0; i < slots.length; i++) {
        if (!usedSlots[i] && slots[i] >= deco.slotLevel) {
          usedSlots[i] = true;
          break;
        }
      }
    }

    return slots.map((slot, index) => (usedSlots[index] ? "X" : slot));
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
          {mhCommonNamespace.mh_common_remaining_slots}
        </button>

        {/* 예리도 추가 이후에 주석풀기 */}
        {/* <button
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
        </button> */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isFinalOnly}
              onChange={(e) => setIsFinalOnly(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{mhCommonNamespace?.mh_common_final_only}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useMaxDecorations}
              onChange={(e) => setUseMaxDecorations(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{mhCommonNamespace?.mh_common_use_max_decorations}</span>
          </label>
        </div>
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
            {/* 예리도 추가 이후에 주석 풀기 */}
            {/* <div>
              {mhCommonNamespace.mh_common_expected_attack}:{" "}
              {weapon.expectedAttack?.toFixed(2) ?? "N/A"}
            </div> */}
            <div>
              {mhCommonNamespace.mh_common_slots}:{" "}
              {getAvailableSlots(weapon).map((slot, index) => (
                <span key={index} className="mr-1">
                  {slot}
                </span>
              ))}
            </div>{" "}
            <div>
              {mhCommonNamespace.mh_common_remaining_slots}:{" "}
              {calculateRemainingSlots(weapon)}
            </div>
            <div>
              {mhCommonNamespace.mh_common_skills}:{" "}
              {Object.entries(weapon.skills).map(([skill, level]) => (
                <span key={skill} className="mr-2">
                  {mhWildsWeaponSkillNamespace[skill] ?? skill} {level}
                </span>
              ))}
              {weaponDecorations[weapon.name]?.map((deco, index) => (
                <React.Fragment key={`deco-${index}`}>
                  <span className="mr-2 text-blue-600">
                    {mhWildsWeaponSkillNamespace[deco.skill] ?? deco.skill}{" "}
                    {deco.level}
                  </span>
                  ,{" "}
                </React.Fragment>
              ))}
            </div>
            <div>
              {mhCommonNamespace.mh_common_decorations}
              {mhCommonNamespace.mh_common_decoration} :{" "}
              {weaponDecorations[weapon.name]?.map((deco, index) => {
                const decoration = mhWildsWeaponSkillDecorationData.find(
                  (d) =>
                    (d as unknown as Decoration).skills[deco.skill] ===
                    deco.level
                ) as unknown as Decoration | undefined;
                return (
                  <span
                    key={`deco-detail-${index}`}
                    className="mr-2 text-blue-600"
                  >
                    {decoration
                      ? mhWildsWeaponDecorationNamespace[decoration.name] ??
                        decoration.name
                      : `${deco.skill} ${deco.level}`}
                  </span>
                );
              })}
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
