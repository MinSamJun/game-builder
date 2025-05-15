"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { MhWildsArmorSkillSelector } from "@/container/mh-common/skill-selector";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";

export function ArmorSimulator() {
  const [selectedRank, setSelectedRank] = React.useState<string | null>(
    "mh_common_high_rank"
  );

  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");

  const [selectedSkills, setSelectedSkills] = React.useState<
    Record<string, string>
  >({});

  const handleSkillChange = (skillName: string, level: string) => {
    setSelectedSkills((prev) => ({ ...prev, [skillName]: level }));
  };

  const resetAllSkills = () => {
    setSelectedSkills({});
  };

  const handleSearch = () => {};

  const rankSelector = useMhSelectRank(selectedRank, setSelectedRank, {
    showMasterRank: false,
    isFinalOnly: false,
  });

  return (
    <div className="p-4 space-y-6">
      <MhWildsArmorSkillSelector
        selectedSkills={selectedSkills}
        onSkillChange={handleSkillChange}
        onResetAllSkills={resetAllSkills}
      />
      {rankSelector}

      <div className="mb-4">
        <button
          onClick={handleSearch}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {mhCommonNamespace?.mh_common_armor_search}
        </button>
      </div>
    </div>
  );
}
