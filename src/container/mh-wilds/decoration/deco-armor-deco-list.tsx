"use client";

import React from "react";
import { mhWildsArmorSkillDecorationData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";
import { useMhWildsList } from "@hook/mh-common/weapon-list";

export function ArmorSkillDecorationList({
  searchTerm,
}: {
  searchTerm: string;
}) {
  const {
    mhCommonNamespace,
    useMhWildsListNamespace,
    weaponNamespace: mhWildsArmorSkillDecorationNamespace,
    filteredList,
    selectedRank,
    setSelectedRank,
    page,
    setPage,
    paginatedData,
    nextPage,
    prevPage,
  } = useMhWildsList(
    mhWildsArmorSkillDecorationData,
    "mhWilds_armor_decoration",
    "mhWilds_armor_skill",
    searchTerm
  );

  React.useEffect(() => {
    setPage(1);
  }, [selectedRank, setPage]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() =>
            setSelectedRank(
              selectedRank === "mh_common_low_rank"
                ? null
                : "mh_common_low_rank"
            )
          }
          className={`px-3 py-1 rounded border ${
            selectedRank === "mh_common_low_rank"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {mhCommonNamespace?.mh_common_low_rank ?? "Low Rank"}
        </button>

        <button
          onClick={() =>
            setSelectedRank(
              selectedRank === "mh_common_high_rank"
                ? null
                : "mh_common_high_rank"
            )
          }
          className={`px-3 py-1 rounded border ${
            selectedRank === "mh_common_high_rank"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {mhCommonNamespace?.mh_common_high_rank ?? "High Rank"}
        </button>
      </div>

      {filteredList.length === 0 ? (
        <NoResults />
      ) : (
        <div>
          {paginatedData.map(({ name, slotlevel, skills }) => (
            <div key={name} className="border p-4 rounded shadow space-y-2">
              <div className="flex items-center">
                <div className="font-semibold">
                  {mhWildsArmorSkillDecorationNamespace[name]}
                </div>
                {slotlevel > 0 && (
                  <div className="text-sm text-gray-600 font-weight: font-bold">
                    　{mhCommonNamespace?.mh_common_decoration_slot} :{" "}
                    {slotlevel}
                  </div>
                )}
              </div>

              <div className="gap-4 text-sm mt-2">
                <div className="bg-gray-800 text-white rounded p-4">
                  {skills && Object.entries(skills).length > 0 ? (
                    Object.entries(skills).map(([key, level]) => {
                      const skillName = useMhWildsListNamespace[key] ?? key;
                      return (
                        <div key={key}>
                          {skillName} : {level}
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

          {filteredList.length > paginatedData.length && (
            <Pagination
              currentPage={page}
              totalItems={filteredList.length}
              itemsPerPage={10}
              onPrev={prevPage}
              onNext={nextPage}
            />
          )}
        </div>
      )}
    </>
  );
}
