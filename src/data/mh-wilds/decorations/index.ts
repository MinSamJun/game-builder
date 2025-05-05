import mhWildsArmorSkillDecorationDataRaw from "./mhwilds-armor-decorations.json";
import mhWildsWeaponSkillDecorationDataRaw from "./mhwilds-weapon-decorations.json";

import type { Decoration } from "@/types/mh-common";

// 모든 장식주의 스킬레벨이 확실하다는 확신이 있기에 as unknown을 사용함
export const mhWildsArmorSkillDecorationData =
  mhWildsArmorSkillDecorationDataRaw as unknown as Decoration[];

export const mhWildsWeaponSkillDecorationData =
  mhWildsWeaponSkillDecorationDataRaw as unknown as Decoration[];
