export type SkillMap = Record<string, number>;

export type ArmorPart =
  | "mhwilds_head"
  | "mhwilds_chest"
  | "mhwilds_arms"
  | "mhwilds_waist"
  | "mhwilds_legs"
  | "mhwilds_charm";

export interface Armor {
  name: string;
  rarity: number;
  rank: string;
  part: ArmorPart;
  skills: SkillMap;
  slots?: number[];
  seriesSkill?: SkillMap;
  groupSkill?: SkillMap;
  defense?: number[];
}
