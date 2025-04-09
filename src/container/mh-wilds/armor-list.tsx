"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import mhWildsArmorData from "@/data/mh-wilds/mhwilds-armors-i18n.json";
import { NoResults } from "@container/common/no-results";

interface ArmorListProps {
  searchTerm: string;
}

interface Armor {
  name: string;
  part: string;
  rank: string;
  skills?: Record<string, number | undefined>;
  slots?: number[];
  seriesSkill?: Record<string, number | undefined>;
  groupSkill?: Record<string, number | undefined>;
  def?: number[];
}

export function ArmorList({ searchTerm }: ArmorListProps) {
  const [selectedPart, setSelectedPart] = React.useState<string | null>(null);
  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const { getNamespaceData } = useI18n();
  const mhWildsArmorNamespace = getNamespaceData("mhWilds_armor") ?? {};
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common") ?? {};
  const mhWildsArmorSkillNamespace =
    getNamespaceData("mhWilds_armor_skill") ?? {};
  const mhWildsArmorSeriesSkillNamespace =
    getNamespaceData("mhWilds_armor_series_skill") ?? {};
  const mhWildsArmorGroupSkillNamespace =
    getNamespaceData("mhWilds_armor_group_skill") ?? {};

  const itemsPerPage = 10;

  const filteredArmorList = (mhWildsArmorData as Armor[]).filter(
    ({ name, part, rank }) =>
      (!selectedPart || part === selectedPart) &&
      (!selectedRank || rank === selectedRank) &&
      (mhWildsArmorNamespace[name] ?? name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const paginatedArmorList = filteredArmorList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const nextPage = () => {
    if (page < Math.ceil(filteredArmorList.length / itemsPerPage)) {
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
      {filteredArmorList.length === 0 ? (
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
                {mhWildsCommonNamespace?.mhwilds_common_head}
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
                {mhWildsCommonNamespace?.mhwilds_common_chest}
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
                {mhWildsCommonNamespace?.mhwilds_common_arms}
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
                {mhWildsCommonNamespace?.mhwilds_common_waist}
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
                {mhWildsCommonNamespace?.mhwilds_common_legs}
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
                {mhWildsCommonNamespace?.mhwilds_common_low_rank}
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
                {mhWildsCommonNamespace?.mhwilds_common_high_rank}
              </button>
            </div>

            {paginatedArmorList.map(
              ({ name, skills, slots, seriesSkill, groupSkill, def }) => (
                <div key={name} className="border p-4 rounded shadow space-y-2">
                  <div className="flex  items-center">
                    <div className="font-semibold">
                      {mhWildsArmorNamespace[name]}
                    </div>
                    <div className="text-sm text-gray-600  font-weight: font-bold">
                      　{mhWildsCommonNamespace?.mhwilds_common_slots} :
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
                        <div>{mhWildsCommonNamespace?.mhwilds_common_none}</div>
                      )}
                    </div>

                    <div className="bg-gray-800 text-white rounded p-4">
                      <strong>
                        {
                          mhWildsCommonNamespace?.mhwilds_common_armor_series_skill
                        }{" "}
                        :
                      </strong>
                      {seriesSkill && Object.keys(seriesSkill).length ? (
                        Object.entries(seriesSkill).map(([skill]) => (
                          <div key={skill}>
                            {mhWildsArmorSeriesSkillNamespace[skill] ?? skill}
                          </div>
                        ))
                      ) : (
                        <div>{mhWildsCommonNamespace?.mhwilds_common_none}</div>
                      )}
                    </div>

                    <div className="bg-gray-800 text-white rounded p-4">
                      <strong>
                        {
                          mhWildsCommonNamespace?.mhwilds_common_armor_group_skill
                        }{" "}
                        :
                      </strong>
                      {groupSkill && Object.keys(groupSkill).length ? (
                        Object.entries(groupSkill).map(([skill]) => (
                          <div key={skill}>
                            {mhWildsArmorGroupSkillNamespace[skill] ?? skill}
                          </div>
                        ))
                      ) : (
                        <div>{mhWildsCommonNamespace?.mhwilds_common_none}</div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm bg-gray-700 text-white rounded p-2">
                    {def?.length === 7 ? (
                      <strong>
                        {mhWildsCommonNamespace?.mhwilds_common_defense}{" "}
                        {def[0]} →{def[1]}　
                        {mhWildsCommonNamespace?.mhwilds_common_fire} :{def[2]}
                        　{mhWildsCommonNamespace?.mhwilds_common_water} :
                        {def[3]}　
                        {mhWildsCommonNamespace?.mhwilds_common_thunder} :
                        {def[4]}　{mhWildsCommonNamespace?.mhwilds_common_ice} :
                        {def[5]}　
                        {mhWildsCommonNamespace?.mhwilds_common_dragon} :
                        {def[6]}
                      </strong>
                    ) : (
                      <div className="text-gray-400 italic">
                        {mhWildsCommonNamespace?.mhwilds_common_noResults}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
            {filteredArmorList.length > paginatedArmorList.length && (
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
        </>
      )}
    </>
  );
}
