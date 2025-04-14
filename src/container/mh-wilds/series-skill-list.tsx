"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsSeriesSkillData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";

interface SeriesSkillListProps {
  searchTerm: string;
}

interface SeriesSkill {
  name: string;
  skill2: string;
  skill4: string;
}

export function SeriesSkillList({ searchTerm }: SeriesSkillListProps) {
  const { getNamespaceData } = useI18n();
  const mhWildsSeriesNameNamespace = getNamespaceData("mhWilds_series_name");
  const mhWildsSeriesSkillNamespace = getNamespaceData("mhWilds_series_skill");

  const lowerSearchTerm = searchTerm.toLowerCase();

  const filteredSeriesSkillList = (
    mhWildsSeriesSkillData as SeriesSkill[]
  ).filter(
    ({ name, skill2 }) =>
      (mhWildsSeriesNameNamespace[name] ?? name)
        .toLowerCase()
        .includes(lowerSearchTerm) ||
      (mhWildsSeriesSkillNamespace[skill2] ?? skill2)
        .toLowerCase()
        .includes(lowerSearchTerm)
  );

  return (
    <>
      {filteredSeriesSkillList.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <div className=" gap-4 text-sm">
            {filteredSeriesSkillList.map(({ name, skill2, skill4 }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="font-semibold text-base">
                  {mhWildsSeriesNameNamespace[name]}
                </div>
                <div className="bg-gray-800 text-white rounded p-4">
                  <div>{mhWildsSeriesSkillNamespace[skill2]}</div>
                  <div>{mhWildsSeriesSkillNamespace[skill4]}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
