"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import {
  ChargeBladeList,
  GunlanceList,
  HuntingHornList,
  InsectglavieList,
  SwitchaxeList,
  BowList,
  LightBowgunList,
  HeavyBowgunList,
  CommonWeaponsList,
} from "@/container/mh-wilds/weapons";
import { useSelectLanguage } from "@/hook/common/use-select-language";
import { WeaponType } from "@/types/mh-common/weapon-type";

export function MhWildsWeapon() {
  const { getNamespaceData } = useI18n();
  const { LanguageSelector } = useSelectLanguage();
  const [weaponType, setWeaponType] = useState<WeaponType>(
    "mhWilds_greatswords"
  );
  const [term, setTerm] = useState("");

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common");

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-6">
        {mhWildsmhCommonNamespace?.mhWilds_planner}
      </div>
      <LanguageSelector />

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setWeaponType("mhWilds_greatswords")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_greatswords"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_greatsword}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_hammers")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_hammers"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_hammer}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_hunting_horn")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_hunting_horn"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_huntinghorn}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_gunlances")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_gunlances"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_gunlance}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_switchaxes")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_switchaxes"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_switchaxe}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_charge_blades")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_charge_blades"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_chargeblade}
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setWeaponType("mhWilds_longswords")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_longswords"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_longsword}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_sword_N_shield")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_sword_N_shield"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_swordandshield}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_dualblades")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_dualblades"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_dualblade}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_lances")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_lances"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_lance}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_insect_glavies")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_insect_glavies"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_insectglavie}
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setWeaponType("mhWilds_bows")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_bows"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_bow}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_light_bowguns")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_light_bowguns"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_light_bowgun}
        </button>
        <button
          onClick={() => setWeaponType("mhWilds_heavy_bowguns")}
          className={`px-4 py-2 rounded ${
            weaponType === "mhWilds_heavy_bowguns"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_heavy_bowgun}
        </button>
      </div>

      <input
        type="text"
        placeholder={mhWildsmhCommonNamespace?.mhwilds_common_searchPlaceholder}
        className="mb-6 px-4 py-2 border rounded w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      {weaponType === "mhWilds_greatswords" ||
      weaponType === "mhWilds_hammers" ||
      weaponType === "mhWilds_longswords" ||
      weaponType === "mhWilds_sword_N_shield" ||
      weaponType === "mhWilds_dualblades" ||
      weaponType === "mhWilds_lances" ? (
        <CommonWeaponsList searchTerm={term} weaponType={weaponType} />
      ) : weaponType === "mhWilds_charge_blades" ? (
        <ChargeBladeList searchTerm={term} />
      ) : weaponType === "mhWilds_gunlances" ? (
        <GunlanceList searchTerm={term} />
      ) : weaponType === "mhWilds_hunting_horn" ? (
        <HuntingHornList searchTerm={term} />
      ) : weaponType === "mhWilds_switchaxes" ? (
        <SwitchaxeList searchTerm={term} />
      ) : weaponType === "mhWilds_insect_glavies" ? (
        <InsectglavieList searchTerm={term} />
      ) : weaponType === "mhWilds_bows" ? (
        <BowList searchTerm={term} />
      ) : weaponType === "mhWilds_light_bowguns" ? (
        <LightBowgunList searchTerm={term} />
      ) : weaponType === "mhWilds_heavy_bowguns" ? (
        <HeavyBowgunList searchTerm={term} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {mhWildsmhCommonNamespace?.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
