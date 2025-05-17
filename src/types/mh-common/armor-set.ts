import { Armor, SkillMap } from "./armor";

export interface ArmorSet {
  head: Armor;
  chest: Armor;
  arms: Armor;
  waist: Armor;
  legs: Armor;
  charm: Armor;
  totalSkills?: SkillMap;
  totalDefense?: number[];
}
