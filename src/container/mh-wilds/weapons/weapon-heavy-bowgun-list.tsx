"use client";

import React from "react";
import { mhWildsHeavyBowgunsData } from "@/data/mh-wilds/weapons";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";
import { useMhWildsList } from "@/hook/mh-common/use-mh-wilds-list";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";

export function HeavyBowgunList({ searchTerm }: { searchTerm: string }) {
  const {
    mhCommonNamespace,
    mhWildsCommonNamespace,
    useMhWildsListNamespace,
    weaponNamespace: mhWildsHeavybowgunNamespace,
    filteredList,
    selectedRank,
    setSelectedRank,
    isFinalOnly,
    setIsFinalOnly,
    page,
    setPage,
    paginatedData,
    nextPage,
    prevPage,
  } = useMhWildsList(
    mhWildsHeavyBowgunsData,
    "mhWilds_heavy_bowguns",
    "mhWilds_weapon_skill",
    searchTerm
  );

  React.useEffect(() => {
    setPage(1);
  }, [selectedRank, isFinalOnly, setPage]);

  return (
    <>
      {useMhSelectRank(selectedRank, setSelectedRank, {
        isFinalOnly,
        setIsFinalOnly,
      })}

      {filteredList.length === 0 ? (
        <NoResults />
      ) : (
        <div>
          {paginatedData.map(
            ({ name, attack, affinity, defense, slots, skills }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="flex items-center">
                  <div className="font-semibold">
                    {mhWildsHeavybowgunNamespace[name]}
                  </div>
                  {slots.length > 0 && (
                    <div className="text-sm text-gray-600 font-weight: font-bold">
                      　{mhCommonNamespace?.mh_common_slots} :{" "}
                      {slots.join(" / ")}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>{mhCommonNamespace?.mh_common_attack}:</strong>{" "}
                    {attack}
                  </div>
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>{mhCommonNamespace?.mh_common_element}:</strong> -
                  </div>
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>{mhCommonNamespace?.mh_common_affinity}:</strong>{" "}
                    {affinity}%
                  </div>
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>{mhCommonNamespace?.mh_common_defense}:</strong>{" "}
                    {defense}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>
                      {mhWildsCommonNamespace?.mhwilds_common_skills}:
                    </strong>
                    {skills && Object.entries(skills).length > 0 ? (
                      Object.entries(skills).map(([key, level]) => {
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
                  <div className="bg-gray-800 text-white rounded p-4">
                    bullets
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div className="bg-gray-800 text-white rounded p-4">
                    custom 1
                  </div>
                  <div className="bg-gray-800 text-white rounded p-4">
                    custom 2
                  </div>
                </div>
              </div>
            )
          )}

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
