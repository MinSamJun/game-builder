"use client";

import React from "react";
import { useSimulator } from "@/hook/use-simulator";
import { ResultTable, SkillSelector } from "@/container/mh-wilds/simulator";
import { ArmorSet } from "@/types/mh-wilds/armor-set";

export function MhWildsSimulator() {
  const { generateArmorSets } = useSimulator();
  const [results, setResults] = React.useState<ArmorSet[]>([]);

  const handleAdd = (skillKey: string, level: number) => {
    const res = generateArmorSets({
      requiredSkills: { [skillKey]: level },
      minDefense: 0,
    });
    setResults(res);
  };

  return (
    <>
      <SkillSelector onChange={handleAdd} />
      <ResultTable results={results} />
    </>
  );
}
