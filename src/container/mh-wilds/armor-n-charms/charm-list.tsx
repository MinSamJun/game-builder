"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsCharmData } from "@/data/mh-wilds/armor-n-charms";
import { NoResults } from "@container/common/no-results";

export function CharmList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsCharmNamespace = getNamespaceData("mhWilds_charm");
  const mhWildsCharmSkillNamespace = getNamespaceData("mhWilds_armor_skill");

  const rankButtonGroups = [
    [
      { type: "mh_common_low_rank", label: "mh_common_low_rank" },
      { type: "mh_common_high_rank", label: "mh_common_high_rank" },
    ],
  ];

  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);
  const filteredCharmList = mhWildsCharmData.filter(
    ({ name, rank }) =>
      (!selectedRank || rank === selectedRank) &&
      (mhWildsCharmNamespace[name] ?? name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {filteredCharmList.length === 0 ? (
        <NoResults />
      ) : (
        <>
          {rankButtonGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-wrap gap-2 mb-4">
              {group.map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() =>
                    setSelectedRank(selectedRank === type ? null : type)
                  }
                  className={`px-3 py-1 rounded border ${
                    selectedRank === type
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {mhCommonNamespace?.[label]}
                </button>
              ))}
            </div>
          ))}
          <div className=" gap-4 text-sm">
            {filteredCharmList.map(({ name, skills }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="font-semibold text-base">
                  {mhWildsCharmNamespace[name]}
                </div>

                <div className="bg-gray-800 text-white rounded p-4">
                  {skills && Object.keys(skills).length > 0 ? (
                    Object.entries(skills).map(([skill, level]) => (
                      <div key={skill}>
                        {mhWildsCharmSkillNamespace?.[skill] ?? skill} Lv{" "}
                        {level}
                      </div>
                    ))
                  ) : (
                    <div>{mhCommonNamespace?.mh_common_none}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
