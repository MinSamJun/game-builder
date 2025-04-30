import mhWildsGreatswordsData from "./mhwilds-greatswords.json";
import mhWildsDualbladesData from "./mhwilds-dualblades.json";
import mhWildsLongswordsData from "./mhwilds-longswords.json";
import mhWildsSwordNShieldsData from "./mhwilds-sword-n-shields.json";
import mhWildsHammersData from "./mhwilds-hammers.json";
import mhWildsHuntingHornsData from "./mhwilds-huntinghorns.json";
import mhWildsLancesData from "./mhwilds-lances.json";
import mhWildsGunlancesData from "./mhwilds-gunlances.json";
import mhWildsSwitchaxesDataRaw from "./mhwilds-switchaxes.json";
import mhWildsChargebladesData from "./mhwilds-chargeblades.json";
import mhWildsInsectGlaviesDataRaw from "./mhwilds-insect-glavies.json";
import mhWildsBowsDataRaw from "./mhwilds-bows.json";
import mhWildsLightBowgunsData from "./mhwilds-light-bowguns.json";
import mhWildsHeavyBowgunsData from "./mhwilds-heavy-bowguns.json";

import {
  MhWildsWeaponWithPhial,
  MhWildsWeaponWithKinsectLevel,
  MhWildsWeaponWithCoating,
} from "@/types/mh-wilds/weapon";

export {
  mhWildsGreatswordsData,
  mhWildsDualbladesData,
  mhWildsLongswordsData,
  mhWildsSwordNShieldsData,
  mhWildsHammersData,
  mhWildsHuntingHornsData,
  mhWildsLancesData,
  mhWildsGunlancesData,
  mhWildsChargebladesData,
  mhWildsLightBowgunsData,
  mhWildsHeavyBowgunsData,
};

export const mhWildsSwitchaxesData =
  mhWildsSwitchaxesDataRaw as MhWildsWeaponWithPhial[];
export const mhWildsInsectGlaviesData =
  mhWildsInsectGlaviesDataRaw as MhWildsWeaponWithKinsectLevel[];
export const mhWildsBowsData = mhWildsBowsDataRaw as MhWildsWeaponWithCoating[];
