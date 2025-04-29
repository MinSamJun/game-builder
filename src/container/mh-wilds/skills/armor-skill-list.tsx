"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsArmorSkillData } from "@/data/mh-wilds/skills";
import { NoResults } from "@container/common/no-results";

export function ArmorSkillList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();
  const mhWildsArmorSkillNamespace = getNamespaceData("mhWilds_armor_skill");

  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredArmorSkillList = mhWildsArmorSkillData.filter(
    ({ name, skills }) => {
      const armorSkillName =
        mhWildsArmorSkillNamespace[name]?.toLowerCase() ?? name.toLowerCase();
      const armorSkillDescription =
        mhWildsArmorSkillNamespace[`${name}_`]?.toLowerCase() ?? "";
      const fullLevelText = Object.entries(skills)
        .map(([level, skillKey]) => {
          const skillDesc = mhWildsArmorSkillNamespace[skillKey] ?? "";
          return `Lv ${level}: ${skillDesc}`;
        })
        .join(" ")
        .toLowerCase();

      return (
        armorSkillName.includes(lowerSearchTerm) ||
        armorSkillDescription.includes(lowerSearchTerm) ||
        fullLevelText.includes(lowerSearchTerm)
      );
    }
  );

  return (
    <>
      {filteredArmorSkillList.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <div className=" gap-4 text-sm">
            {filteredArmorSkillList.map(({ name, skills }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="font-semibold text-base">
                  {mhWildsArmorSkillNamespace[name]}
                </div>
                <div className="bg-gray-800 text-white rounded p-4 whitespace-pre-wrap">
                  {mhWildsArmorSkillNamespace[`${name}_`]}
                  {Object.entries(skills).map(([skillLevel, skill]) => (
                    <div className="mt-[10px]" key={skillLevel}>
                      {`Lv ${skillLevel}: ${mhWildsArmorSkillNamespace[skill]}`}
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
