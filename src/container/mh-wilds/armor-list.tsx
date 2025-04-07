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
}

export function ArmorList({ searchTerm }: ArmorListProps) {
  const [selectedPart, setSelectedPart] = useState<ArmorPart | null>(null);
  const { getNamespaceData } = useI18n();
  const mhWildsArmorNamespace = getNamespaceData("mhWilds_armor") ?? {};
  const mhWildsArmorSkillNamespace =
    getNamespaceData("mhWilds_armor_skill") ?? {};

  const filteredArmorList = (mhWildsArmorData as Armor[]).filter(
    ({ name, part }) =>
      (!selectedPart || part === selectedPart) &&
      (mhWildsArmorNamespace[name] ?? name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

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

      {filteredArmorList.map(
        ({ name, skills, slots, setSkill, seriesSkill, def }) => (
          <div key={name} className="border p-4 rounded shadow">
            <div className="font-semibold">{mhWildsArmorNamespace[name]}</div>

            <div className="text-sm mt-2 bg-gray-800 text-white rounded p-2">
              {skills ? (
                Object.entries(skills).map(([skill, level]) => (
                  <div key={skill}>
                    {mhWildsArmorSkillNamespace[skill] ?? skill}: Lv {level}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 italic">No skills</div>
              )}
              {slots}
              {setSkill}
              {seriesSkill}
            </div>

            <div className="text-sm mt-2 bg-gray-700 text-white rounded p-2">
              {def?.length === 6 ? (
                <div>
                  {["물리 ", "　화 ", "　수 ", "　뇌 ", "　빙 ", "　용 "].map(
                    (label, index) => (
                      <div key={label}>
                        {label}: {def[index]}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="text-gray-400 italic">No defense data</div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
