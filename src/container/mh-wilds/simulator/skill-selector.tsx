"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { mhWildsArmorSkillData } from "@/data/mh-wilds";

export function SkillSelector({
  onChange,
}: {
  onChange: (skillKey: string, level: number) => void;
}) {
  const { getNamespaceData } = useI18n();
  const t = getNamespaceData("mhWilds_armor_skill") ?? {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {mhWildsArmorSkillData.map((skill) => {
        const skillName = t[skill.name] ?? skill.name;

        return (
          <div key={skill.name} className="relative">
            <label className="block mb-1 text-sm font-semibold">
              {skillName}
            </label>

            <select
              className="w-full border rounded px-2 py-1 text-black bg-white"
              defaultValue=""
              onChange={(e) => {
                const level = parseInt(e.target.value);
                if (!isNaN(level)) {
                  onChange(skill.name, level);
                }
              }}
            >
              <option value="">--</option>
              {Object.keys(skill.skills).map((lv) => (
                <option key={lv} value={lv}>
                  Lv{lv}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
