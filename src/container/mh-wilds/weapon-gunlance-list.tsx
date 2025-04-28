"use client";

import React from "react";
import { mhWildsGunlancesData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";
import { useMhWildsList } from "@/hook/mh-common/use-mh-wilds-list";
import { useI18n } from "@infrastructure/user-i18n";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";

export function GunlanceList({ searchTerm }: { searchTerm: string }) {
  const {
    mhCommonNamespace,
    mhWildsCommonNamespace,
    useMhWildsListNamespace,
    weaponNamespace: mhWildsGunlanceNamespace,
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
    mhWildsGunlancesData,
    "mhWilds_gunlances",
    "mhWilds_weapon_skill",
    searchTerm
  );

  const { getNamespaceData } = useI18n();
  const mhWildsShellingTypeNamespace = getNamespaceData(
    "mhWilds_shelling_type"
  );
  const mhWildsShellingDamageNamespace = getNamespaceData(
    "mhWilds_shelling_damage"
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
            ({
              name,
              attack,
              element,
              affinity,
              defense,
              slots,
              skills,
              Shelling,
            }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    {mhWildsGunlanceNamespace[name]}
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
                    <strong>{mhCommonNamespace?.mh_common_element}:</strong>{" "}
                    {element
                      ? typeof element === "object"
                        ? Object.entries(element)
                            .map(
                              ([key, value]) =>
                                `${mhCommonNamespace[key] ?? key}: ${value}`
                            )
                            .join(", ")
                        : element
                      : "-"}
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
                    <strong>
                      {mhWildsCommonNamespace?.mhwilds_common_shelling ??
                        "Shelling"}
                    </strong>
                    {Shelling && Object.entries(Shelling).length > 0 ? (
                      Object.entries(Shelling).map(([typeKey, damageKey]) => {
                        const typeName =
                          mhWildsShellingTypeNamespace[typeKey] ?? typeKey;
                        const damageName =
                          mhWildsShellingDamageNamespace[damageKey] ??
                          damageKey;
                        return (
                          <div key={typeKey}>
                            {typeName} : {damageName}
                          </div>
                        );
                      })
                    ) : (
                      <div>{mhCommonNamespace?.mh_common_none}</div>
                    )}
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
