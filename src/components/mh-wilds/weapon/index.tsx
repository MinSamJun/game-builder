"use client";

import { useState } from "react";
import { useI18n } from "@infrastructure/user-i18n";
import {
  GreatswordList,
  ChargeBladeList,
  GunlanceList,
  HammerList,
  HuntingHornList,
  DualbladeList,
  InsectglavieList,
  LanceList,
  LongswordList,
  BowList,
  LightBowgunList,
  HeavyBowgunList,
} from "@/container/mh-wilds";

type EquipmentNamespace =
  | "mhWilds_greatswords"
  | "mhWilds_charge_blades"
  | "mhWilds_gunlances"
  | "mhWilds_hammers"
  | "mhWilds_hunting_horn"
  | "mhWilds_dualblades"
  | "mhWilds_insect_glavies"
  | "mhWilds_lances"
  | "mhWilds_longswords"
  | "mhWilds_bows"
  | "mhWilds_light_bowguns"
  | "mhWilds_heavy_bowguns";

export function MhWildsWeapon() {
  const { lang, setLang, getNamespaceData } = useI18n();
  const [equipmentType, setEquipmentType] = useState<EquipmentNamespace>(
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
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setLang("ko")}
          className={`px-4 py-2 rounded ${
            lang === "ko" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          한국어
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-4 py-2 rounded ${
            lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLang("ja")}
          className={`px-4 py-2 rounded ${
            lang === "ja" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          日本語
        </button>
      </div>
      {/* 대검, 해머, 수렵 피리, 건랜스, 슬래시 액스, 차지 액스 */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setEquipmentType("mhWilds_greatswords")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_greatswords"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_greatsword}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_charge_blades")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_charge_blades"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_chargeblade}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_gunlances")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_gunlances"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_gunlance}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_hammers")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_hammers"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_hammer}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_hunting_horn")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_hunting_horn"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_huntinghorn}
        </button>
      </div>
      {/* 태도, 한손검, 쌍검, 랜스, 조충곤 */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setEquipmentType("mhWilds_dualblades")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_dualblades"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_dualblade}
        </button>{" "}
        <button
          onClick={() => setEquipmentType("mhWilds_insect_glavies")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_insect_glavies"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_insectglavie}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_lances")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_lances"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_lance}
        </button>{" "}
        <button
          onClick={() => setEquipmentType("mhWilds_longswords")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_longswords"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_longsword}
        </button>
      </div>
      {/* 라이트 보우건, 헤비 보우건, 활 */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setEquipmentType("mhWilds_bows")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_bows"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_bow}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_light_bowguns")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_light_bowguns"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {mhCommonNamespace?.mh_common_light_bowgun}
        </button>
        <button
          onClick={() => setEquipmentType("mhWilds_heavy_bowguns")}
          className={`px-4 py-2 rounded ${
            equipmentType === "mhWilds_heavy_bowguns"
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
      {equipmentType === "mhWilds_greatswords" ? (
        <GreatswordList searchTerm={term} />
      ) : equipmentType === "mhWilds_charge_blades" ? (
        <ChargeBladeList searchTerm={term} />
      ) : equipmentType === "mhWilds_gunlances" ? (
        <GunlanceList searchTerm={term} />
      ) : equipmentType === "mhWilds_hammers" ? (
        <HammerList searchTerm={term} />
      ) : equipmentType === "mhWilds_hunting_horn" ? (
        <HuntingHornList searchTerm={term} />
      ) : equipmentType === "mhWilds_dualblades" ? (
        <DualbladeList searchTerm={term} />
      ) : equipmentType === "mhWilds_insect_glavies" ? (
        <InsectglavieList searchTerm={term} />
      ) : equipmentType === "mhWilds_lances" ? (
        <LanceList searchTerm={term} />
      ) : equipmentType === "mhWilds_longswords" ? (
        <LongswordList searchTerm={term} />
      ) : equipmentType === "mhWilds_bows" ? (
        <BowList searchTerm={term} />
      ) : equipmentType === "mhWilds_light_bowguns" ? (
        <LightBowgunList searchTerm={term} />
      ) : equipmentType === "mhWilds_heavy_bowguns" ? (
        <HeavyBowgunList searchTerm={term} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {mhWildsmhCommonNamespace?.mhwilds_common_noResults}
        </div>
      )}
    </div>
  );
}
