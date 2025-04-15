"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsCharmData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";

export function CharmList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();
  const mhWildsCharmNamespace = getNamespaceData("mhWilds_charm");
  const mhWildsCharmSkillNamespace = getNamespaceData("mhWilds_armor_skill");
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common");

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
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              key={"mhwilds_low_rank"}
              onClick={() =>
                setSelectedRank(
                  selectedRank === "mhwilds_low_rank"
                    ? null
                    : "mhwilds_low_rank"
                )
              }
              className={`px-3 py-1 rounded border ${
                selectedRank === "mhwilds_low_rank"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {mhWildsCommonNamespace?.mhwilds_common_low_rank}
            </button>
            <button
              key={"mhwilds_high_rank"}
              onClick={() =>
                setSelectedRank(
                  selectedRank === "mhwilds_high_rank"
                    ? null
                    : "mhwilds_high_rank"
                )
              }
              className={`px-3 py-1 rounded border ${
                selectedRank === "mhwilds_high_rank"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {mhWildsCommonNamespace?.mhwilds_common_high_rank}
            </button>
          </div>
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
                    <div>{mhWildsCommonNamespace?.mhwilds_common_none}</div>
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
