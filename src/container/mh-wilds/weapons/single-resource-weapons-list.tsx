"use client";

import React from "react";
import {
  mhWildsSwitchaxesData,
  mhWildsInsectGlaviesData,
  mhWildsBowsData,
} from "@/data/mh-wilds/weapons";
import { useI18n } from "@infrastructure/user-i18n";
import { usePagination } from "@/hook/common/use-pagenation";
import { NoResults } from "@container/common/no-results";
import { Pagination } from "@infrastructure/common/pagenation";
import { useMhSelectRank } from "@/hook/mh-common/use-mh-select-rank";
import { WeaponType } from "@/types/mh-common/weapon-type";

interface BaseWeapon {
  name: string;
  part: string;
  rarity: number;
  rank: string;
  attack: number;
  element: Record<string, number> | string | null;
  affinity: number;
  defense: number;
  slots: string[];
  skills: Record<string, number>;
}

interface WeaponWithPhial extends BaseWeapon {
  phial: Record<string, string | null>;
}

interface WeaponWithKinsectLevel extends BaseWeapon {
  kinsectlevel: number;
}

interface WeaponWithCoating extends BaseWeapon {
  coating: string[];
}

type Weapon = WeaponWithPhial | WeaponWithKinsectLevel | WeaponWithCoating;

function isWeaponWithPhial(weapon: Weapon): weapon is WeaponWithPhial {
  return "phial" in weapon;
}

function isWeaponWithKinsectLevel(
  weapon: Weapon
): weapon is WeaponWithKinsectLevel {
  return "kinsectlevel" in weapon;
}

function isWeaponWithCoating(weapon: Weapon): weapon is WeaponWithCoating {
  return "coating" in weapon;
}

export function SingleResourceWeaponsList({
  searchTerm,
  weaponType,
}: {
  searchTerm: string;
  weaponType: WeaponType;
}) {
  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common");
  const useMhWildsListNamespace = getNamespaceData("mhWilds_weapon_skill");
  const weaponNamespace = getNamespaceData(weaponType);
  const mhWildsCoatingNamespace = getNamespaceData("mh_coating") ?? {};
  const mhWildsPhialNamespace = getNamespaceData("mh_phial") ?? {};

  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);
  const [isFinalOnly, setIsFinalOnly] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const selectedWeaponData = React.useMemo(() => {
    switch (weaponType) {
      case "mhWilds_switchaxes":
        return mhWildsSwitchaxesData as unknown as WeaponWithPhial[];
      case "mhWilds_insect_glavies":
        return mhWildsInsectGlaviesData as unknown as WeaponWithKinsectLevel[];
      case "mhWilds_bows":
        return mhWildsBowsData as unknown as WeaponWithCoating[];
      default:
        return [];
    }
  }, [weaponType]);

  const filteredList = React.useMemo(() => {
    return selectedWeaponData.filter(
      ({ name, rank, rarity }) =>
        (!selectedRank || rank === selectedRank) &&
        (!isFinalOnly || rarity === 4 || rarity === 8) &&
        (weaponNamespace[name] ?? name)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [
    selectedWeaponData,
    selectedRank,
    isFinalOnly,
    weaponNamespace,
    searchTerm,
  ]);

  const itemsPerPage = 10;
  const { paginatedData, nextPage, prevPage } = usePagination(
    filteredList,
    itemsPerPage,
    searchTerm
  );

  React.useEffect(() => {
    setPage(1);
  }, [selectedRank, isFinalOnly]);

  const renderSpecialResource = (weapon: Weapon) => {
    switch (weaponType) {
      case "mhWilds_bows":
        if (isWeaponWithCoating(weapon)) {
          return (
            <div className="bg-gray-800 text-white rounded p-4">
              <strong>{mhWildsCoatingNamespace?.mh_coating}:</strong>
              {weapon.coating && weapon.coating.length > 0 ? (
                weapon.coating.map((coatingKey: string) => (
                  <div key={coatingKey}>
                    {mhWildsCoatingNamespace[coatingKey] ?? coatingKey}
                  </div>
                ))
              ) : (
                <div>{mhCommonNamespace?.mh_common_none}</div>
              )}
            </div>
          );
        }
        return null;
      case "mhWilds_insect_glavies":
        if (isWeaponWithKinsectLevel(weapon)) {
          return (
            <div className="bg-gray-800 text-white rounded p-4">
              <strong>
                {mhCommonNamespace?.mh_common_insectglavie_kinsectlevel}:
              </strong>{" "}
              {`Lv ${weapon.kinsectlevel}`}
            </div>
          );
        }
        return null;
      case "mhWilds_switchaxes":
        if (isWeaponWithPhial(weapon)) {
          return (
            <div className="bg-gray-800 text-white rounded p-4">
              <strong>{mhWildsPhialNamespace?.mh_phial}:</strong>
              {weapon.phial && Object.keys(weapon.phial).length > 0 ? (
                Object.entries(weapon.phial).map(([phialKey]) => (
                  <div key={phialKey}>
                    {mhWildsPhialNamespace[phialKey] ?? phialKey}
                  </div>
                ))
              ) : (
                <div>{mhCommonNamespace?.mh_common_none}</div>
              )}
            </div>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      {useMhSelectRank(selectedRank, setSelectedRank, {
        isFinalOnly,
        setIsFinalOnly,
      })}

      {filteredList.length === 0 ? (
        <NoResults />
      ) : (
        <div>
          {paginatedData.map((weapon) => (
            <div
              key={weapon.name}
              className="border p-4 rounded shadow space-y-2"
            >
              <div className="flex items-center">
                <div className="font-semibold">
                  {weaponNamespace[weapon.name]}
                </div>
                {weapon.slots.length > 0 && (
                  <div className="text-sm text-gray-600 font-weight: font-bold">
                    　{mhCommonNamespace?.mh_common_slots} :{" "}
                    {weapon.slots.join(" / ")}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-800 text-white rounded p-4">
                  <strong>{mhCommonNamespace?.mh_common_attack}:</strong>{" "}
                  {weapon.attack}
                </div>
                <div className="bg-gray-800 text-white rounded p-4">
                  <strong>{mhCommonNamespace?.mh_common_element}:</strong>{" "}
                  {weapon.element
                    ? typeof weapon.element === "object"
                      ? Object.entries(weapon.element)
                          .map(
                            ([key, value]) =>
                              `${mhCommonNamespace[key] ?? key}: ${value}`
                          )
                          .join(", ")
                      : weapon.element
                    : "-"}
                </div>

                <div className="bg-gray-800 text-white rounded p-4">
                  <strong>{mhCommonNamespace?.mh_common_affinity}:</strong>{" "}
                  {weapon.affinity}%
                </div>

                <div className="bg-gray-800 text-white rounded p-4">
                  <strong>{mhCommonNamespace?.mh_common_defense}:</strong>{" "}
                  {weapon.defense}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                <div className="bg-gray-800 text-white rounded p-4">
                  <strong>
                    {mhWildsCommonNamespace?.mhwilds_common_skills}:
                  </strong>
                  {weapon.skills && Object.entries(weapon.skills).length > 0 ? (
                    Object.entries(weapon.skills).map(([key, level]) => {
                      const skillName = useMhWildsListNamespace[key] ?? key;
                      return (
                        <div key={key}>
                          {skillName} Lv{level}
                        </div>
                      );
                    })
                  ) : (
                    <div>{mhCommonNamespace?.mh_common_none}</div>
                  )}
                </div>
                {renderSpecialResource(weapon)}
              </div>
            </div>
          ))}

          {filteredList.length > paginatedData.length && (
            <Pagination
              currentPage={page}
              totalItems={filteredList.length}
              itemsPerPage={10}
              onPrev={prevPage}
              onNext={nextPage}
            />
          )}
        </div>
      )}
    </>
  );
}
