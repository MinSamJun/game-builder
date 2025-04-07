"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import mhWildsArmorData from "@/data/mh-wilds/mhwilds-armors-i18n.json";

const armorPartFilter = ["head", "chest", "arms", "waist", "legs"] as const;
type ArmorPart = (typeof armorPartFilter)[number];

interface ArmorListProps {
  searchTerm: string;
}

interface Armor {
  name: string;
  part: ArmorPart;
  skills?: Record<string, number | undefined>;
  slots?: number[];
  seriesSkill?: Record<string, number | undefined>;
  groupSkill?: Record<string, number | undefined>;
  def?: number[];
}

export function ArmorList({ searchTerm }: ArmorListProps) {
  const [selectedPart, setSelectedPart] = useState<ArmorPart | null>(null);
  const [page, setPage] = useState(1);
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
    ({ name, part }) =>
      (!selectedPart || part === selectedPart) &&
      (mhWildsArmorNamespace[name] ?? name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const paginatedArmorList = filteredArmorList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {armorPartFilter.map((part) => (
          <button
            key={part}
            onClick={() => setSelectedPart(selectedPart === part ? null : part)}
            className={`px-3 py-1 rounded border ${
              selectedPart === part
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {part.toUpperCase()}
          </button>
        ))}
      </div>

      {paginatedArmorList.map(
        ({ name, skills, slots, seriesSkill, groupSkill, def }) => (
          <div key={name} className="border p-4 rounded shadow space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-semibold">{mhWildsArmorNamespace[name]}</div>
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
                      {mhWildsArmorSkillNamespace[skill] ?? skill} Lv {level}
                    </div>
                  ))
                ) : (
                  <div>{mhWildsCommonNamespace?.mhwilds_common_none}</div>
                )}
              </div>

              <div className="bg-gray-800 text-white rounded p-4">
                <strong>
                  {mhWildsCommonNamespace?.mhwilds_common_armor_series_skill} :
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
                  {mhWildsCommonNamespace?.mhwilds_common_armor_group_skill} :
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
                  {mhWildsCommonNamespace?.mhwilds_common_defense} {def[0]} →
                  {def[1]}　{mhWildsCommonNamespace?.mhwilds_common_fire} :
                  {def[2]}　{mhWildsCommonNamespace?.mhwilds_common_water} :
                  {def[3]}　{mhWildsCommonNamespace?.mhwilds_common_thunder} :
                  {def[4]}　{mhWildsCommonNamespace?.mhwilds_common_ice} :
                  {def[5]}　{mhWildsCommonNamespace?.mhwilds_common_dragon} :
                  {def[6]}
                </strong>
              ) : (
                <div className="text-gray-400 italic">No defense data</div>
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
            이전페이지
          </button>
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            다음페이지
          </button>
        </div>
      )}
    </div>
  );
}
