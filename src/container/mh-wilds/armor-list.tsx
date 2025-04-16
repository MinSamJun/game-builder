"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsArmorData } from "@/data/mh-wilds";
import { NoResults } from "@container/common/no-results";
import { usePagination } from "@/hook/use-pageation";
import { Pagination } from "@infrastructure/common/pagenation";

export function ArmorList({ searchTerm }: { searchTerm: string }) {
  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsArmorNamespace = getNamespaceData("mhWilds_armor") ?? {};
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common") ?? {};
  const mhWildsArmorSkillNamespace =
    getNamespaceData("mhWilds_armor_skill") ?? {};
  const mhWildsArmorSeriesSkillNamespace =
    getNamespaceData("mhWilds_series_name") ?? {};
  const mhWildsArmorGroupSkillNamespace =
    getNamespaceData("mhWilds_group_name") ?? {};

  const [selectedPart, setSelectedPart] = React.useState<string | null>(null);
  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);

  const filteredArmorList = mhWildsArmorData.filter(
    ({ name, part, rank }) =>
      (!selectedPart || part === selectedPart) &&
      (!selectedRank || rank === selectedRank) &&
      (mhWildsArmorNamespace[name] ?? name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const { page, paginatedData, nextPage, prevPage } = usePagination(
    filteredArmorList,
    itemsPerPage,
    searchTerm
  );

  return (
    <>
      {paginatedData.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                key={"mhwilds_head"}
                onClick={() =>
                  setSelectedPart(
                    selectedPart === "mhwilds_head" ? null : "mhwilds_head"
                  )
                }
                className={`px-3 py-1 rounded border ${
                  selectedPart === "mhwilds_head"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {mhCommonNamespace?.mh_common_head}
              </button>

              <button
                key={"mhwilds_chest"}
                onClick={() =>
                  setSelectedPart(
                    selectedPart === "mhwilds_chest" ? null : "mhwilds_chest"
                  )
                }
                className={`px-3 py-1 rounded border ${
                  selectedPart === "mhwilds_chest"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {mhCommonNamespace?.mh_common_chest}
              </button>

              <button
                key={"mhwilds_arms"}
                onClick={() =>
                  setSelectedPart(
                    selectedPart === "mhwilds_arms" ? null : "mhwilds_arms"
                  )
                }
                className={`px-3 py-1 rounded border ${
                  selectedPart === "mhwilds_arms"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {mhCommonNamespace?.mh_common_arms}
              </button>

              <button
                key={"mhwilds_waist"}
                onClick={() =>
                  setSelectedPart(
                    selectedPart === "mhwilds_waist" ? null : "mhwilds_waist"
                  )
                }
                className={`px-3 py-1 rounded border ${
                  selectedPart === "mhwilds_waist"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {mhCommonNamespace?.mh_common_waist}
              </button>

              <button
                key={"mhwilds_legs"}
                onClick={() =>
                  setSelectedPart(
                    selectedPart === "mhwilds_legs" ? null : "mhwilds_legs"
                  )
                }
                className={`px-3 py-1 rounded border ${
                  selectedPart === "mhwilds_legs"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {mhCommonNamespace?.mh_common_legs}
              </button>
            </div>

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
                {mhCommonNamespace?.mh_common_low_rank}
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
                {mhCommonNamespace?.mh_common_high_rank}
              </button>
            </div>

            {paginatedData.map(
              ({ name, skills, slots, seriesSkill, groupSkill, def }) => (
                <div key={name} className="border p-4 rounded shadow space-y-2">
                  <div className="flex  items-center">
                    <div className="font-semibold">
                      {mhWildsArmorNamespace[name]}
                    </div>
                    <div className="text-sm text-gray-600  font-weight: font-bold">
                      　{mhWildsmhCommonNamespace?.mhwilds_common_slots} :
                      {slots?.join(" / ")}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-800 text-white rounded p-4">
                      <strong>
                        {mhWildsmhCommonNamespace?.mhwilds_common_skills} :
                      </strong>
                      {skills && Object.keys(skills).length ? (
                        Object.entries(skills).map(([skill, level]) => (
                          <div key={skill}>
                            {mhWildsArmorSkillNamespace[skill] ?? skill} Lv{" "}
                            {level}
                          </div>
                        ))
                      ) : (
                        <div>{mhCommonNamespace?.mh_common_none}</div>
                      )}
                    </div>

                    <div className="bg-gray-800 text-white rounded p-4">
                      <strong>
                        {mhWildsmhCommonNamespace?.mhwilds_common_series_skill}{" "}
                        :
                      </strong>
                      {seriesSkill && Object.keys(seriesSkill).length ? (
                        Object.entries(seriesSkill).map(([skill]) => (
                          <div key={skill}>
                            {mhWildsArmorSeriesSkillNamespace[skill] ?? skill}
                          </div>
                        ))
                      ) : (
                        <div>{mhCommonNamespace?.mh_common_none}</div>
                      )}
                    </div>

                    <div className="bg-gray-800 text-white rounded p-4">
                      <strong>
                        {mhWildsmhCommonNamespace?.mhwilds_common_group_skill} :
                      </strong>
                      {groupSkill && Object.keys(groupSkill).length ? (
                        Object.entries(groupSkill).map(([skill]) => (
                          <div key={skill}>
                            {mhWildsArmorGroupSkillNamespace[skill] ?? skill}
                          </div>
                        ))
                      ) : (
                        <div>{mhCommonNamespace?.mh_common_none}</div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm bg-gray-700 text-white rounded p-2">
                    {def?.length === 7 ? (
                      <strong>
                        {mhCommonNamespace?.mh_common_defense} {def[0]} →
                        {def[1]}　{mhCommonNamespace?.mh_common_fire} :{def[2]}
                        　{mhCommonNamespace?.mh_common_water} :{def[3]}　
                        {mhCommonNamespace?.mh_common_thunder} :{def[4]}　
                        {mhCommonNamespace?.mh_common_ice} :{def[5]}　
                        {mhCommonNamespace?.mh_common_dragon} :{def[6]}
                      </strong>
                    ) : (
                      <div className="text-gray-400 italic">
                        {mhCommonNamespace?.mh_common_none}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
            {filteredArmorList.length > paginatedData.length && (
              <Pagination
                currentPage={page}
                totalItems={filteredArmorList.length}
                itemsPerPage={itemsPerPage}
                onPrev={prevPage}
                onNext={nextPage}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
