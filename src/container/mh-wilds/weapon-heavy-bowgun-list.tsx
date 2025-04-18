"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsHeavybowgunsData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";

export function HeavyBowgunList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsHeavybowgunNamespace =
    getNamespaceData("mhWilds_heavy_bowguns") ?? {};
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common") ?? {};
  const mhWildsWeaponSkillsNamespace =
    getNamespaceData("mhWilds_weapon_skill") ?? {};

  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);
  const [isFinalOnly, setIsFinalOnly] = React.useState(false);

  const filteredList = mhWildsHeavybowgunsData.filter(
    ({ name, rank, rarity }) =>
      (!selectedRank || rank === selectedRank) &&
      (!isFinalOnly || rarity === 4 || rarity === 8) &&
      (mhWildsHeavybowgunNamespace[name] ?? name)
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
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() =>
            setSelectedRank(
              selectedRank === "mhwilds_low_rank" ? null : "mhwilds_low_rank"
            )
          }
          className={`px-3 py-1 rounded border ${
            selectedRank === "mhwilds_low_rank"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {mhCommonNamespace?.mh_common_low_rank ?? "Low Rank"}
        </button>

        <button
          onClick={() =>
            setSelectedRank(
              selectedRank === "mhwilds_high_rank" ? null : "mhwilds_high_rank"
            )
          }
          className={`px-3 py-1 rounded border ${
            selectedRank === "mhwilds_high_rank"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {mhCommonNamespace?.mh_common_high_rank ?? "High Rank"}
        </button>

        <label
          htmlFor="finalOnlyCheckbox"
          className="flex items-center gap-2 ml-4 text-sm"
        >
          <input
            id="finalOnlyCheckbox"
            type="checkbox"
            checked={isFinalOnly}
            onChange={() => setIsFinalOnly(!isFinalOnly)}
          />
          {mhCommonNamespace?.mh_common_final_only ?? "final only"}
        </label>
      </div>

      {filteredList.length === 0 ? (
        <NoResults />
      ) : (
        <div>
          {paginatedList.map(
            ({ name, attack, element, affinity, defense, slots, skills }) => (
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

          {filteredList.length > paginatedList.length && (
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
