"use client";

import React from "react";
import { mhWildsArmorData } from "@/data/mh-wilds/armor-n-charms";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";
import { useMhWildsList } from "@/hook/mh-common/use-mh-wilds-list";
import { useI18n } from "@infrastructure/user-i18n";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";

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

  const armorPartButtonGroups = [
    [
      { type: "mhwilds_head", label: "mh_common_head" },
      { type: "mhwilds_chest", label: "mh_common_chest" },
      { type: "mhwilds_arms", label: "mh_common_arms" },
      { type: "mhwilds_waist", label: "mh_common_waist" },
      { type: "mhwilds_legs", label: "mh_common_legs" },
    ],
  ];

  const rankSelector = useMhSelectRank(selectedRank, setSelectedRank, {
    showMasterRank: false,
  });

  const filteredByPart = React.useMemo(() => {
    if (!selectedPart) return filteredArmorList;
    return filteredArmorList.filter((armor) => armor.part === selectedPart);
  }, [filteredArmorList, selectedPart]);

  const finalPaginatedData = React.useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredByPart.slice(startIndex, endIndex);
  }, [filteredByPart, page, itemsPerPage]);

  return (
    <>
      {finalPaginatedData.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <div>
            {armorPartButtonGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-wrap gap-2 mb-4">
                {group.map(({ type, label }) => (
                  <button
                    key={type}
                    onClick={() =>
                      setSelectedPart(selectedPart === type ? null : type)
                    }
                    className={`px-3 py-1 rounded border ${
                      selectedPart === type
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {mhCommonNamespace?.[label]}
                  </button>
                ))}
              </div>
            ))}

            {rankSelector}

            {finalPaginatedData.map(
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
            {filteredArmorList.length > finalPaginatedData.length && (
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
