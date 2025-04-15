"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsBowsData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";

export function BowList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();
  const mhWildsBowNamespace = getNamespaceData("mhWilds_bows") ?? {};
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common") ?? {};
  const mhWildsWeaponSkillsNamespace =
    getNamespaceData("mhWilds_weapon_skill") ?? {};
  const mhWildsCoatingNamespace = getNamespaceData("mhWilds_coating") ?? {};

  const filteredList = mhWildsBowsData.filter(({ name }) =>
    (mhWildsBowNamespace[name] ?? name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const [page, setPage] = React.useState(1);
  const itemsPerPage = 10;

  const paginatedList = filteredList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const nextPage = () => {
    if (page < Math.ceil(filteredList.length / itemsPerPage)) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      {filteredList.length === 0 ? (
        <NoResults />
      ) : (
        <div>
          {paginatedList.map(
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
                    　{mhWildsCommonNamespace?.mhwilds_common_slots} :{" "}
                    {slots.join(" / ")}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>
                      {mhWildsCommonNamespace?.mhwilds_common_attack}:
                    </strong>{" "}
                    {attack}
                  </div>
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>
                      {mhWildsCommonNamespace?.mhwilds_common_element}:
                    </strong>{" "}
                    {element
                      ? typeof element === "object"
                        ? Object.entries(element)
                            .map(
                              ([key, value]) =>
                                `${mhWildsCommonNamespace[`${key}`]}: ${value}`
                            )
                            .join(", ")
                        : element
                      : "-"}
                  </div>

                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>
                      {mhWildsCommonNamespace?.mhwilds_common_affinity}:
                    </strong>{" "}
                    {affinity}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>
                      {mhWildsCommonNamespace?.mhwilds_common_defense}:
                    </strong>{" "}
                    {defense}
                  </div>

                  <div className="bg-gray-800 text-white rounded p-4">
                    <strong>
                      {mhWildsCommonNamespace?.mhwilds_common_skills}:
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
                      <div>{mhWildsCommonNamespace?.mhwilds_common_none}</div>
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
                    <div>{mhWildsCommonNamespace?.mhwilds_common_none}</div>
                  )}
                </div>
              </div>
            )
          )}

          {filteredList.length > paginatedList.length && (
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={prevPage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {mhWildsCommonNamespace?.mhwilds_common_prev_page}
              </button>
              <button
                onClick={nextPage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {mhWildsCommonNamespace?.mhwilds_common_next_page}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
