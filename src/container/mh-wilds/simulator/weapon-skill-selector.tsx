"use client";

import React from "react";
import { mhWildsWeaponSkillData } from "@/data/mh-wilds";
import { useI18n } from "@infrastructure/user-i18n";

interface WeaponSkillSelectorProps {
  selectedSkills: Record<string, string>;
  onSkillChange: (skillName: string, level: string) => void;
}

export function WeaponSkillSelector({
  selectedSkills,
  onSkillChange,
}: WeaponSkillSelectorProps) {
  const { getNamespaceData } = useI18n();
  const mhWildsWeaponSkillNamespace = getNamespaceData("mhWilds_weapon_skill");
  const mhWildsWeaponSkillTypeNamespace = getNamespaceData(
    "mhWilds_weapon_skill_type"
  );

  const skillsByCategory = React.useMemo(() => {
    return mhWildsWeaponSkillData.reduce((acc, skill) => {
      const category = skill.category || "mhwilds_weapon_skill_type_etc";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as Record<string, typeof mhWildsWeaponSkillData>);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {mhWildsWeaponSkillNamespace?.mhWilds_weapon_skills}
      </div>
      <div className="space-y-8">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold">
              {mhWildsWeaponSkillTypeNamespace[category] ?? category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="space-y-4 p-4 border rounded-lg"
                >
                  <div className="font-semibold mb-2">
                    {mhWildsWeaponSkillNamespace[skill.name] ?? skill.name}
                  </div>
                  <select
                    className="border p-2 rounded w-full"
                    value={selectedSkills[skill.name] || ""}
                    onChange={(e) => onSkillChange(skill.name, e.target.value)}
                  >
                    <option className="text-black" value="">
                      선택하세요
                    </option>
                    {Object.entries(skill.skills).map(([level, skillId]) => (
                      <option
                        key={skillId}
                        value={level}
                        className="text-black"
                      >
                        {mhWildsWeaponSkillNamespace[level] ?? level}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
