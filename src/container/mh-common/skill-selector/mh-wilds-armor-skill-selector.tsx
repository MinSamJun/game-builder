"use client";

import React from "react";
import { mhWildsArmorSkillData } from "@/data/mh-wilds/skills";
import { useI18n } from "@infrastructure/user-i18n";
import { IoRefresh } from "react-icons/io5";

const CATEGORIES = [
  "mhwilds_skill_type_damage",
  "mhwilds_skill_type_status",
  "mhwilds_skill_type_affinity",
  "mhwilds_skill_type_element",
  "mhwilds_skill_type_damage_reduce",
  "mhwilds_skill_type_status_reduce",
  "mhwilds_skill_type_recovery",
  "mhwilds_skill_type_resource",
  "mhwilds_skill_type_action",
  "mhwilds_skill_type_support",
  "mhwilds_skill_type_item",
  "mhwilds_skill_type_environment",
  "mhwilds_skill_type_etc",
];

interface MhWildsSkillSelectorProps {
  selectedSkills: Record<string, string>;
  onSkillChange: (skillName: string, level: string) => void;
  onResetAllSkills: () => void;
}

export function MhWildsArmorSkillSelector({
  selectedSkills,
  onSkillChange,
  onResetAllSkills,
}: MhWildsSkillSelectorProps) {
  const { getNamespaceData } = useI18n();
  const skillNamespace = getNamespaceData("mhWilds_armor_skill") ?? {};
  const typeNamespace = getNamespaceData("mhWilds_skill_type") ?? {};

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {skillNamespace.mhWilds_armor_skills}
      </div>
      <div className="space-y-8">
        {CATEGORIES.map((category) => {
          const skills = mhWildsArmorSkillData.filter(
            (skill) =>
              (skill.category ?? "mhwilds_armor_skill_type_etc") === category
          );

          if (skills.length === 0) return null;

          return (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold">
                {typeNamespace[category] ?? category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="space-y-2 p-4 border rounded-lg"
                  >
                    <div className="font-semibold">
                      {skillNamespace[skill.name] ?? skill.name}
                    </div>
                    <select
                      className="border p-2 rounded w-full"
                      value={selectedSkills[skill.name] || ""}
                      onChange={(e) =>
                        onSkillChange(skill.name, e.target.value)
                      }
                    >
                      <option value="" className="text-black">
                        ----
                      </option>
                      {Object.entries(skill.skills).map(([level, id]) => (
                        <option key={id} value={level} className="text-black">
                          {skillNamespace[level] ?? level}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="text-2xl font-bold">
          {skillNamespace.mhWilds_armor_skills}
        </div>
        <button
          onClick={onResetAllSkills}
          className="flex items-center gap-2 text-sm px-4 py-2 border rounded hover:bg-gray-100"
        >
          <IoRefresh className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
