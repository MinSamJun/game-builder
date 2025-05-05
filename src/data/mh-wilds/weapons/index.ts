import mhWildsGreatswordsDataRaw from "./mhwilds-greatswords.json";
import mhWildsDualbladesDataRaw from "./mhwilds-dualblades.json";
import mhWildsLongswordsDataRaw from "./mhwilds-longswords.json";
import mhWildsSwordNShieldsDataRaw from "./mhwilds-sword-n-shields.json";
import mhWildsHammersDataRaw from "./mhwilds-hammers.json";
import mhWildsHuntingHornsDataRaw from "./mhwilds-huntinghorns.json";
import mhWildsLancesDataRaw from "./mhwilds-lances.json";
import mhWildsGunlancesDataRaw from "./mhwilds-gunlances.json";
import mhWildsSwitchaxesDataRaw from "./mhwilds-switchaxes.json";
import mhWildsChargebladesDataRaw from "./mhwilds-chargeblades.json";
import mhWildsInsectGlaviesDataRaw from "./mhwilds-insect-glavies.json";
import mhWildsBowsDataRaw from "./mhwilds-bows.json";
import mhWildsLightBowgunsDataRaw from "./mhwilds-light-bowguns.json";
import mhWildsHeavyBowgunsDataRaw from "./mhwilds-heavy-bowguns.json";

import {
  MhWildsBaseWeapon,
  MhWildsWeaponSwitchaxe,
  MhWildsWeaponInsectglavie,
  MhWildsWeaponBow,
  MhWildsWeaponHuntinghorn,
  MhWildsWeaponGunlance,
  MhWildsWeaponLightBowgun,
  MhWildsWeaponHeavyBowgun,
} from "@/types/mh-wilds/weapon";

export const mhWildsGreatswordsData =
  mhWildsGreatswordsDataRaw as MhWildsBaseWeapon[];

export const mhWildsDualbladesData =
  mhWildsDualbladesDataRaw as MhWildsBaseWeapon[];

export const mhWildsLongswordsData =
  mhWildsLongswordsDataRaw as MhWildsBaseWeapon[];

export const mhWildsSwordNShieldsData =
  mhWildsSwordNShieldsDataRaw as MhWildsBaseWeapon[];

export const mhWildsHammersData = mhWildsHammersDataRaw as MhWildsBaseWeapon[];

export const mhWildsLancesData = mhWildsLancesDataRaw as MhWildsBaseWeapon[];

export const mhWildsChargebladesData =
  mhWildsChargebladesDataRaw as MhWildsBaseWeapon[];

export const mhWildsSwitchaxesData =
  mhWildsSwitchaxesDataRaw as MhWildsWeaponSwitchaxe[];

export const mhWildsInsectGlaviesData =
  mhWildsInsectGlaviesDataRaw as MhWildsWeaponInsectglavie[];

export const mhWildsBowsData = mhWildsBowsDataRaw as MhWildsWeaponBow[];

export const mhWildsHuntingHornsData =
  mhWildsHuntingHornsDataRaw as MhWildsWeaponHuntinghorn[];

export const mhWildsGunlancesData =
  mhWildsGunlancesDataRaw as MhWildsWeaponGunlance[];

export const mhWildsLightBowgunsData =
  mhWildsLightBowgunsDataRaw as MhWildsWeaponLightBowgun[];

export const mhWildsHeavyBowgunsData =
  mhWildsHeavyBowgunsDataRaw as MhWildsWeaponHeavyBowgun[];
