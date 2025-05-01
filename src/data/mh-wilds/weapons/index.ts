import mhWildsGreatswordsData from "./mhwilds-greatswords.json";
import mhWildsDualbladesData from "./mhwilds-dualblades.json";
import mhWildsLongswordsData from "./mhwilds-longswords.json";
import mhWildsSwordNShieldsData from "./mhwilds-sword-n-shields.json";
import mhWildsHammersData from "./mhwilds-hammers.json";
import mhWildsHuntingHornsDataRaw from "./mhwilds-huntinghorns.json";
import mhWildsLancesData from "./mhwilds-lances.json";
import mhWildsGunlancesDataRaw from "./mhwilds-gunlances.json";
import mhWildsSwitchaxesDataRaw from "./mhwilds-switchaxes.json";
import mhWildsChargebladesData from "./mhwilds-chargeblades.json";
import mhWildsInsectGlaviesDataRaw from "./mhwilds-insect-glavies.json";
import mhWildsBowsDataRaw from "./mhwilds-bows.json";
import mhWildsLightBowgunsDataRaw from "./mhwilds-light-bowguns.json";
import mhWildsHeavyBowgunsDataRaw from "./mhwilds-heavy-bowguns.json";

import {
  MhWildsWeaponSwitchaxe,
  MhWildsWeaponInsectglavie,
  MhWildsWeaponBow,
  MhWildsWeaponHuntinghorn,
  MhWildsWeaponGunlance,
  MhWildsWeaponLightBowgun,
  MhWildsWeaponHeavyBowgun,
} from "@/types/mh-wilds/weapon";

export {
  mhWildsGreatswordsData,
  mhWildsDualbladesData,
  mhWildsLongswordsData,
  mhWildsSwordNShieldsData,
  mhWildsHammersData,
  mhWildsLancesData,
  mhWildsChargebladesData,
};

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
