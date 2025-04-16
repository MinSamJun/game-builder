"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsBowsData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";
import { usePagination } from "@/hook/use-pageation";
import { Pagination } from "@infrastructure/common/pagenation";

export function BowList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();
  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsBowNamespace = getNamespaceData("mhWilds_bows") ?? {};
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common") ?? {};
  const mhWildsWeaponSkillsNamespace =
    getNamespaceData("mhWilds_weapon_skill") ?? {};
  const mhWildsCoatingNamespace = getNamespaceData("mhWilds_coating") ?? {};

  const filteredList = mhWildsBowsData.filter(({ name }) =>
    (mhWildsBowNamespace[name] ?? name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const { page, paginatedData, nextPage, prevPage } = usePagination(
    filteredList,
    itemsPerPage,
    searchTerm
  );

  return (
    <>
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
              coating,
            }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="flex items-center">
                  <div className="font-semibold">
                    {mhWildsBowNamespace[name]}
                  </div>
                  <div className="text-sm text-gray-600 font-weight: font-bold">
                    　{mhCommonNamespace?.mh_common_slots} : {slots.join(" / ")}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
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
                                `${
                                  mhWildsmhCommonNamespace[`${key}`]
                                }: ${value}`
                            )
                            .join(", ")
                        : element
                      : "-"}
                  </div>

                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>{mhCommonNamespace?.mh_common_affinity}:</strong>{" "}
                    {affinity}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>{mhCommonNamespace?.mh_common_defense}:</strong>{" "}
                    {defense}
                  </div>

                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>
                      {mhWildsmhCommonNamespace?.mhwilds_common_skills}:
                    </strong>
                    {skills && Object.entries(skills).length > 0 ? (
                      Object.entries(skills).map(([key, level]) => {
                        const skillName =
                          mhWildsWeaponSkillsNamespace[key] ?? key;
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
                <div className="bg-gray-800 text-white rounded p-4">
                  <strong>{mhWildsCoatingNamespace?.mhwilds_coating}:</strong>
                  {coating && coating.length > 0 ? (
                    coating.map((coatingKey) => (
                      <div key={coatingKey}>
                        {mhWildsCoatingNamespace[coatingKey] ?? coatingKey}
                      </div>
                    ))
                  ) : (
                    <div>{mhCommonNamespace?.mh_common_none}</div>
                  )}
                </div>
              </div>
            )
          )}

          {filteredList.length > paginatedData.length && (
            <Pagination
              currentPage={page}
              totalItems={filteredList.length}
              itemsPerPage={itemsPerPage}
              onPrev={prevPage}
              onNext={nextPage}
            />
          )}
        </div>
      )}
    </>
  );
}
