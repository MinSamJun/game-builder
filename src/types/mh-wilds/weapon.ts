export type MhWildsBaseWeapon = {
  name: string;
  part: string;
  rarity: number;
  rank: string;
  attack: number;
  element: Record<string, number> | null;
  affinity: number;
  defense: number;
  slots: number[];
  skills: Record<string, number>;
};

type PhialType =
  | "mh_power_phial"
  | "mh_exhaust_phial"
  | "mh_poison_phial"
  | "mh_paralyse_phial"
  | "mh_element_phial"
  | "mh_dragon_phial";

export interface MhWildsWeaponWithPhial extends MhWildsBaseWeapon {
  phial: { [PhialName in PhialType]?: number | null };
}

export interface MhWildsWeaponWithKinsectLevel extends MhWildsBaseWeapon {
  kinsectlevel: number;
}

export interface MhWildsWeaponWithCoating extends MhWildsBaseWeapon {
  coating: string[];
}
