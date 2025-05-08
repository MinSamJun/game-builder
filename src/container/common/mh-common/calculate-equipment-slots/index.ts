import type { MhCommonBaseWeapon } from "@/types/mh-common/weapon";
import type { Decoration } from "@/types/mh-common";

export function calculateEquipmentSlots(
  weapon: MhCommonBaseWeapon,
  decorations: Decoration[]
): Record<string, number> {
  const result: Record<string, number> = { ...weapon.skills };
  const slots = [...(weapon.slots || [])].sort((a, b) => b - a);

  const usedSlotIndices = new Set<number>();

  for (const dec of decorations) {
    const slotIndex = slots.findIndex(
      (slot, idx) => !usedSlotIndices.has(idx) && dec.slotlevel <= slot
    );
    if (slotIndex !== -1) {
      usedSlotIndices.add(slotIndex);
      for (const [skill, level] of Object.entries(dec.skills)) {
        result[skill] = (result[skill] || 0) + level;
      }
    }
  }

  return result;
}
