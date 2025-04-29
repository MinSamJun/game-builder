"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsWeaponSkillData } from "@/data/mh-wilds/skills";
import { NoResults } from "@container/common/no-results";

export function WeaponSkillList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();
  const mhWildsWeaponSkillNamespace = getNamespaceData("mhWilds_weapon_skill");

  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredWeaponSkillList = mhWildsWeaponSkillData.filter(
    ({ name, skills }) => {
      const weaponSkillName =
        mhWildsWeaponSkillNamespace[name]?.toLowerCase() ?? name.toLowerCase();
      const weaponSkillDescription =
        mhWildsWeaponSkillNamespace[`${name}_`]?.toLowerCase() ?? "";
      const fullLevelText = Object.entries(skills)
        .map(([level, skillKey]) => {
          const skillDesc = mhWildsWeaponSkillNamespace[skillKey] ?? "";
          return `Lv ${level}: ${skillDesc}`;
        })
        .join(" ")
        .toLowerCase();

      return (
        weaponSkillName.includes(lowerSearchTerm) ||
        weaponSkillDescription.includes(lowerSearchTerm) ||
        fullLevelText.includes(lowerSearchTerm)
      );
    }
  );

  return (
    <>
      {filteredWeaponSkillList.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <div className=" gap-4 text-sm">
            {filteredWeaponSkillList.map(({ name, skills }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="font-semibold text-base">
                  {mhWildsWeaponSkillNamespace[name]}
                </div>
                <div className="bg-gray-800 text-white rounded p-4 whitespace-pre-wrap">
                  {mhWildsWeaponSkillNamespace[`${name}_`]}
                  {Object.entries(skills).map(([skillLevel, skill]) => (
                    <div className="mt-[10px]" key={skillLevel}>
                      {`Lv ${skillLevel}: ${mhWildsWeaponSkillNamespace[skill]}`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
