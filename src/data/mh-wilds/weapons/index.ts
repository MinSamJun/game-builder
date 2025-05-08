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
  MhCommonBaseWeapon,
  MhWildsWeaponSwitchaxe,
  MhWildsWeaponInsectglavie,
  MhWildsWeaponBow,
  MhWildsWeaponHuntinghorn,
  MhWildsWeaponGunlance,
  MhWildsWeaponLightBowgun,
  MhWildsWeaponHeavyBowgun,
} from "@/types/mh-common/weapon";

export const mhWildsGreatswordsData =
  mhWildsGreatswordsDataRaw as MhCommonBaseWeapon[];

export const mhWildsDualbladesData =
  mhWildsDualbladesDataRaw as MhCommonBaseWeapon[];

export const mhWildsLongswordsData =
  mhWildsLongswordsDataRaw as MhCommonBaseWeapon[];

export const mhWildsSwordNShieldsData =
  mhWildsSwordNShieldsDataRaw as MhCommonBaseWeapon[];

export const mhWildsHammersData = mhWildsHammersDataRaw as MhCommonBaseWeapon[];

export const mhWildsLancesData = mhWildsLancesDataRaw as MhCommonBaseWeapon[];

export const mhWildsChargebladesData =
  mhWildsChargebladesDataRaw as MhCommonBaseWeapon[];

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
