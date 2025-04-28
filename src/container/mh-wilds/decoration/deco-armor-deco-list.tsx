"use client";

import React from "react";
import { mhWildsArmorSkillDecorationData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";
import { useMhWildsList } from "@/hook/mh-common/use-mh-wilds-list";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";

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
      {useMhSelectRank(selectedRank, setSelectedRank)}

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
