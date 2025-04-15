"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsGroupSkillData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";

export function GroupSkillList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();
  const mhWildsGroupNameNamespace = getNamespaceData("mhWilds_group_name");
  const mhWildsGroupSkillNamespace = getNamespaceData("mhWilds_group_skill");

  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredGroupSkillList = mhWildsGroupSkillData.filter(
    ({ name, skill }) =>
      (mhWildsGroupNameNamespace[name] ?? name)
        .toLowerCase()
        .includes(lowerSearchTerm) ||
      (mhWildsGroupSkillNamespace[skill] ?? skill)
        .toLowerCase()
        .includes(lowerSearchTerm)
  );

  return (
    <>
      {filteredGroupSkillList.length === 0 ? (
        <NoResults />
      ) : (
        <div className="gap-4 text-sm">
          {filteredGroupSkillList.map(({ name, skill }) => (
            <div key={name} className="border p-4 rounded shadow space-y-2">
              <div className="font-semibold text-base">
                {mhWildsGroupNameNamespace[name] ?? name}
              </div>
              <div className="bg-gray-800 text-white rounded p-4">
                <div>{mhWildsGroupSkillNamespace[skill] ?? skill}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
