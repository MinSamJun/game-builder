"use client";

import React from "react";
import {
  mhWildsGreatswordsData,
  mhWildsDualbladesData,
  mhWildsLongswordsData,
  mhWildsSwordNShieldsData,
  mhWildsHammersData,
  mhWildsLancesData,
} from "@/data/mh-wilds/weapons";
import { useI18n } from "@infrastructure/user-i18n";
import { usePagination } from "@/hook/common/use-pagenation";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";
import { WeaponType } from "@/types/mh-common/weapon-type";

export function CommonWeaponsList({
  searchTerm,
  weaponType,
}: {
  searchTerm: string;
  weaponType: WeaponType;
}) {
  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common");
  const useMhWildsListNamespace = getNamespaceData("mhWilds_weapon_skill");
  const weaponNamespace = getNamespaceData(weaponType);

  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);
  const [isFinalOnly, setIsFinalOnly] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const selectedWeaponData = React.useMemo(() => {
    switch (weaponType) {
      case "mhWilds_greatswords":
        return mhWildsGreatswordsData;
      case "mhWilds_dualblades":
        return mhWildsDualbladesData;
      case "mhWilds_longswords":
        return mhWildsLongswordsData;
      case "mhWilds_sword_N_shield":
        return mhWildsSwordNShieldsData;
      case "mhWilds_hammers":
        return mhWildsHammersData;
      case "mhWilds_lances":
        return mhWildsLancesData;
      default:
        return [];
    }
  }, [weaponType]);

  const filteredList = React.useMemo(() => {
    return selectedWeaponData.filter(
      ({ name, rank, rarity }) =>
        (!selectedRank || rank === selectedRank) &&
        (!isFinalOnly || rarity === 4 || rarity === 8) &&
        (weaponNamespace[name] ?? name)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [
    selectedWeaponData,
    selectedRank,
    isFinalOnly,
    weaponNamespace,
    searchTerm,
  ]);

  const itemsPerPage = 10;
  const { paginatedData, nextPage, prevPage } = usePagination(
    filteredList,
    itemsPerPage,
    searchTerm
  );

  React.useEffect(() => {
    setPage(1);
  }, [selectedRank, isFinalOnly]);

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
            ({ name, attack, element, affinity, defense, slots, skills }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="flex items-center">
                  <div className="font-semibold">{weaponNamespace[name]}</div>
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

                <div className="gap-4 text-sm mt-2">
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
