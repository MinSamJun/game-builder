import { mhWildsArmorSkillDecorationDataRaw } from "./mhwilds-armor-decorations";
import { mhWildsWeaponSkillDecorationDataRaw } from "./mhwilds-weapon-decorations";

export const mhWildsArmorSkillDecorationData =
  mhWildsArmorSkillDecorationDataRaw.filter(
    (decoration) => decoration.type !== "0"
  );

export const mhWildsWeaponSkillDecorationData =
  mhWildsWeaponSkillDecorationDataRaw.filter(
    (decoration) => decoration.type !== "0"
  );
