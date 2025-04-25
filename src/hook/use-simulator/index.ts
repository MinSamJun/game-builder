import { useCallback } from "react";
import { Armor, ArmorPart, SkillMap } from "@/types/mh-wilds/armor";
import { ArmorSet } from "@/types/mh-wilds/armor-set";
import { mhWildsArmorData, mhWildsCharmData } from "@/data/mh-wilds";

interface SearchParams {
  requiredSkills: SkillMap;
  minDefense: number;
}

export function useSimulator() {
  const generateArmorSets = useCallback((params: SearchParams): ArmorSet[] => {
    const { requiredSkills, minDefense } = params;

    const partFilter = (part: ArmorPart) =>
      mhWildsArmorData
        .filter((item) => item.part === part)
        .map((item) => ({
          ...item,
          part: item.part as ArmorPart,
          skills: Object.fromEntries(
            Object.entries(item.skills).map(([key, value]) => [key, value ?? 0])
          ),
          seriesSkill: item.seriesSkill
            ? Object.fromEntries(
                Object.entries(item.seriesSkill).map(([key, value]) => [
                  key,
                  value ?? 0,
                ])
              )
            : undefined,
          groupSkill: item.groupSkill
            ? Object.fromEntries(
                Object.entries(item.groupSkill).map(([key, value]) => [
                  key,
                  value ?? 0,
                ])
              )
            : undefined,
        })) as Armor[];

    const parts = {
      head: partFilter("mhwilds_head"),
      chest: partFilter("mhwilds_chest"),
      arms: partFilter("mhwilds_arms"),
      waist: partFilter("mhwilds_waist"),
      legs: partFilter("mhwilds_legs"),
    };

    const charms = mhWildsCharmData.map((charm) => ({
      ...charm,
      part: "mhwilds_charm" as ArmorPart,
      skills: Object.fromEntries(
        Object.entries(charm.skills).map(([key, value]) => [key, value ?? 0])
      ),
    })) as Armor[];

    const results: ArmorSet[] = [];

    for (const head of parts.head)
      for (const chest of parts.chest)
        for (const arms of parts.arms)
          for (const waist of parts.waist)
            for (const legs of parts.legs)
              for (const charm of [undefined, ...charms]) {
                const allEquip: Armor[] = [
                  head,
                  chest,
                  arms,
                  waist,
                  legs,
                  ...(charm ? [charm] : []),
                ];

                const totalSkills: SkillMap = {};
                const totalDefense = [0, 0, 0, 0, 0, 0, 0];

                for (const item of allEquip) {
                  for (const [key, value] of Object.entries(item.skills)) {
                    totalSkills[key] = (totalSkills[key] ?? 0) + value;
                  }
                  if (item.defense) {
                    for (let i = 0; i < totalDefense.length; i++) {
                      totalDefense[i] += item.defense[i] ?? 0;
                    }
                  }
                }

                const allSkillsMatch = Object.entries(requiredSkills).every(
                  ([key, level]) => (totalSkills[key] ?? 0) >= level
                );

                if (allSkillsMatch && totalDefense[1] >= minDefense) {
                  results.push({
                    head,
                    chest,
                    arms,
                    waist,
                    legs,
                    charm,
                    totalSkills,
                    totalDefense,
                  });
                }
              }

    return results;
  }, []);

  return { generateArmorSets };
}
