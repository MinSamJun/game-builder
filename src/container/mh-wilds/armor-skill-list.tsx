"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsArmorSkillData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";

interface ArmorSkillListProps {
  searchTerm: string;
}

interface ArmorSkill {
  name: string;
  skills: Record<number, string>;
}

export function ArmorSkillList({ searchTerm }: ArmorSkillListProps) {
  const { getNamespaceData } = useI18n();
  const mhWildsArmorNamespace = getNamespaceData("mhWilds_armor");
  const mhWildsArmorSkillNamespace = getNamespaceData("mhWilds_armor_skill");

  const filteredArmorSkillList = (mhWildsArmorSkillData as ArmorSkill[]).filter(
    ({ name }) =>
      (mhWildsArmorNamespace[name] ?? name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
                <div className="bg-gray-800 text-white rounded p-4">
                  {mhWildsArmorSkillNamespace[`${name}_`]}
                  {Object.entries(skills).map(([skillLevel, skill]) => (
                    <div key={skillLevel}>
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
