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

export interface MhWildsWeaponSwitchaxe extends MhWildsBaseWeapon {
  phial: { [PhialName in PhialType]?: number | null };
}

export interface MhWildsWeaponInsectglavie extends MhWildsBaseWeapon {
  kinsectlevel: number;
}

export interface MhWildsWeaponBow extends MhWildsBaseWeapon {
  coating: string[];
}

export interface MhWildsWeaponHuntinghorn extends MhWildsBaseWeapon {
  notes: number[];
  echoBubbles: string;
}

type ShellingType = {
  mhwilds_shelling_type_normal?: string;
  mhwilds_shelling_type_wide?: string;
  mhwilds_shelling_type_long?: string;
};

export interface MhWildsWeaponGunlance extends MhWildsBaseWeapon {
  shelling: ShellingType;
}

export interface MhWildsWeaponLightBowgun extends MhWildsBaseWeapon {
  ammo: Record<string, string>;
  customModes: Record<string, string>;
}

export interface MhWildsWeaponHeavyBowgun extends MhWildsBaseWeapon {
  ammo: Record<string, string>;
  customModes: Record<string, string>;
  specializationType: Record<string, number>;
  ignitionGaugeRecovery: number | null;
}
