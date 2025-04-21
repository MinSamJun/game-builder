"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsInsectGlaviesData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";
import { usePagination } from "@/hook/use-pageation";
import { Pagination } from "@infrastructure/common/pagenation";

export function InsectglavieList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsInsectglavieNamespace = React.useMemo(
    () => getNamespaceData("mhWilds_insect_glavies") ?? {},
    [getNamespaceData]
  );

  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common") ?? {};
  const mhWildsWeaponSkillsNamespace =
    getNamespaceData("mhWilds_weapon_skill") ?? {};

  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);
  const [isFinalOnly, setIsFinalOnly] = React.useState(false);

  const filteredList = React.useMemo(() => {
    return mhWildsInsectGlaviesData.filter(
      ({ name, rank, rarity }) =>
        (!selectedRank || rank === selectedRank) &&
        (!isFinalOnly || rarity === 4 || rarity === 8) &&
        (mhWildsInsectglavieNamespace[name] ?? name)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [selectedRank, isFinalOnly, mhWildsInsectglavieNamespace, searchTerm]);

  const itemsPerPage = 10;
  const { page, setPage, paginatedData, nextPage, prevPage } = usePagination(
    filteredList,
    itemsPerPage,
    searchTerm
  );

  React.useEffect(() => {
    setPage(1);
  }, [selectedRank, isFinalOnly, setPage]);

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
          {paginatedData.map(
            ({
              name,
              attack,
              element,
              affinity,
              defense,
              slots,
              skills,
              kinsectlevel,
            }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="flex items-center">
                  <div className="font-semibold">
                    {mhWildsInsectglavieNamespace[name]}
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
                    <strong>
                      {mhCommonNamespace?.mh_common_insectglavie_kinsectlevel}:
                    </strong>{" "}
                    {`Lv ${kinsectlevel}`}
                  </div>
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
