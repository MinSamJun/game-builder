export type MhWildsArmor = {
  name: string;
  rarity: number;
  rank: string;
  part: string;
  skills: Record<string, number>;
  slots: number[];
  seriesSkill: Record<string, number>;
  groupSkill: Record<string, number>;
  def: number[];
};

export type MhWildsCharm = {
  name: string;
  rarity: number;
  rank: string;
  part: string;
  skills: Record<string, number>;
};
