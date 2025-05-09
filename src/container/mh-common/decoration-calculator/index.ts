import type { MhCommonBaseWeapon } from "@/types/mh-common";

export type Decoration = {
  name: string;
  slotlevel: number;
  skills: Record<string, number>;
};

export const calculateDecorationCombinations = (
  slots: number[],
  decorations: Decoration[],
  requiredSkills: Record<string, number>,
  weaponSkills: Record<string, number> = {}
): Decoration[][] => {
  const combinations: Decoration[][] = [];

  const remainingRequiredSkills: Record<string, number> = {};
  Object.entries(requiredSkills).forEach(([skill, level]) => {
    const weaponSkillLevel = weaponSkills[skill] || 0;
    if (weaponSkillLevel < level) {
      remainingRequiredSkills[skill] = level - weaponSkillLevel;
    }
  });

  if (Object.keys(remainingRequiredSkills).length === 0) {
    return [[]];
  }

  const availableDecorations = decorations
    .filter(
      (dec) =>
        Object.keys(remainingRequiredSkills).some(
          (skill) => dec.skills[skill]
        ) && slots.some((slot) => slot >= dec.slotlevel)
    )
    .sort((a, b) => a.slotlevel - b.slotlevel);

  const generateCombinations = (
    remainingSlots: number[],
    currentCombination: Decoration[],
    startIndex: number,
    currentSkills: Record<string, number>
  ) => {
    const meetsRequirements = Object.entries(remainingRequiredSkills).every(
      ([skill, level]) => (currentSkills[skill] || 0) >= level
    );

    if (meetsRequirements) {
      combinations.push([...currentCombination]);
      return;
    }

    if (remainingSlots.length === 0) return;

    for (let i = startIndex; i < availableDecorations.length; i++) {
      const dec = availableDecorations[i];
      const slotIndex = remainingSlots.findIndex(
        (slot) => slot >= dec.slotlevel
      );

      if (slotIndex !== -1) {
        const newRemainingSlots = [...remainingSlots];
        newRemainingSlots.splice(slotIndex, 1);

        const newSkills = { ...currentSkills };
        Object.entries(dec.skills).forEach(([skill, level]) => {
          newSkills[skill] = (newSkills[skill] || 0) + level;
        });

        generateCombinations(
          newRemainingSlots,
          [...currentCombination, dec],
          i,
          newSkills
        );
      }
    }
  };

  generateCombinations([...slots], [], 0, {});
  return combinations;
};

export const calculateTotalSkills = (
  weapon: MhCommonBaseWeapon,
  decorations: Decoration[]
): Record<string, number> => {
  const totalSkills = { ...weapon.skills };

  decorations.forEach((dec) => {
    Object.entries(dec.skills).forEach(([skill, level]) => {
      totalSkills[skill] = (totalSkills[skill] || 0) + level;
    });
  });

  return totalSkills;
};
