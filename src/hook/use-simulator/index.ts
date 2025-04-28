import { useState, useMemo } from "react";
import { mhWildsGreatswordsData } from "@/data/mh-wilds";
import { calculateExpectedAttack } from "@/utils/mh-wilds/simulator-utils";

export function useSimulator() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const onSkillChange = (skills: string[]) => {
    setSelectedSkills(skills);
  };

  // 사용안됨
  const filteredWeapons = useMemo(() => {
    return mhWildsGreatswordsData
      .filter((weapon) =>
        selectedSkills.every((skill) =>
          Object.keys(weapon.skills).includes(skill)
        )
      )
      .map((weapon) => ({
        ...weapon,
        expectedAttack: calculateExpectedAttack(
          weapon.attack,
          weapon.affinity ?? 0
        ),
      }));
  }, [selectedSkills]);

  return {
    filteredWeapons,
    selectedSkills,
    onSkillChange,
  };
}
