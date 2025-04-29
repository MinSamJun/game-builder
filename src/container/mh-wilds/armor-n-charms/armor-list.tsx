"use client";

import React from "react";
import { mhWildsArmorData } from "@/data/mh-wilds/armor-n-charms";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";
import { useMhWildsList } from "@/hook/mh-common/use-mh-wilds-list";
import { useI18n } from "@infrastructure/user-i18n";

export function ArmorList({ searchTerm }: { searchTerm: string }) {
  const {
    mhCommonNamespace,
    mhWildsCommonNamespace,
    weaponNamespace: mhWildsArmorNamespace,
    useMhWildsListNamespace: mhWildsArmorSkillNamespace,
    filteredList: filteredArmorList,
    selectedRank,
    setSelectedRank,
    page,
    paginatedData,
    nextPage,
    prevPage,
  } = useMhWildsList(
    mhWildsArmorData,
    "mhWilds_armor",
    "mhWilds_armor_skill",
    searchTerm
  );

  const { getNamespaceData } = useI18n();
  const mhWildsSeriesNameNamespace = getNamespaceData("mhWilds_series_name");
  const mhWildsGroupNameNamespace = getNamespaceData("mhWilds_group_name");

  const [selectedPart, setSelectedPart] = React.useState<string | null>(null);

  const itemsPerPage = 10;

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
                key={"mh_common_low_rank"}
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
                {mhCommonNamespace?.mh_common_low_rank}
              </button>

              <button
                key={"mh_common_high_rank"}
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
                      　{mhCommonNamespace?.mh_common_slots} :
                      {slots?.join(" / ")}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-800 text-white rounded p-4">
                      <strong>
                        {mhWildsCommonNamespace?.mhwilds_common_skills} :
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
                        {mhWildsCommonNamespace?.mhwilds_common_series_skill} :
                      </strong>
                      {seriesSkill && Object.keys(seriesSkill).length ? (
                        Object.entries(seriesSkill).map(([skill]) => (
                          <div key={skill}>
                            {mhWildsSeriesNameNamespace[`${skill}`] ?? skill}
                          </div>
                        ))
                      ) : (
                        <div>{mhCommonNamespace?.mh_common_none}</div>
                      )}
                    </div>

                    <div className="bg-gray-800 text-white rounded p-4">
                      <strong>
                        {mhWildsCommonNamespace?.mhwilds_common_group_skill} :
                      </strong>
                      {groupSkill && Object.keys(groupSkill).length ? (
                        Object.entries(groupSkill).map(([skill]) => (
                          <div key={skill}>
                            {mhWildsGroupNameNamespace[`${skill}`] ?? skill}
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
