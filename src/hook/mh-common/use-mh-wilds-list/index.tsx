"use client";

import React from "react";
import { useI18n } from "@infrastructure/user-i18n";
import { usePagination } from "@/hook/common/use-pagenation";
import { mhWildsKo } from "@infrastructure/i18n/mh-wilds";

type WeaponNamespaceKey = keyof typeof mhWildsKo;

export function useMhWildsList<
  WeaponEntry extends { name: string; rank: string; rarity: number },
  K extends WeaponNamespaceKey
>(
  data: WeaponEntry[],
  weaponNamespaceKey: K,
  weaponSkillNamespaceKey: K,
  searchTerm: string
) {
  const { getNamespaceData } = useI18n();

  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common") ?? {};
  const useMhWildsListNamespace =
    getNamespaceData(weaponSkillNamespaceKey) ?? {};
  const weaponNamespace = React.useMemo(
    () => getNamespaceData(weaponNamespaceKey) ?? {},
    [getNamespaceData, weaponNamespaceKey]
  );

  const [selectedRank, setSelectedRank] = React.useState<string | null>(null);
  const [isFinalOnly, setIsFinalOnly] = React.useState(false);

  const filteredList = React.useMemo(() => {
    return data.filter(
      ({ name, rank, rarity }) =>
        (!selectedRank || rank === selectedRank) &&
        (!isFinalOnly || rarity === 4 || rarity === 8) &&
        (weaponNamespace[name] ?? name)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [data, selectedRank, isFinalOnly, weaponNamespace, searchTerm]);

  const itemsPerPage = 10;
  const pagination = usePagination(filteredList, itemsPerPage, searchTerm);

  return {
    mhCommonNamespace,
    mhWildsCommonNamespace,
    useMhWildsListNamespace,
    weaponNamespace,
    filteredList,
    selectedRank,
    setSelectedRank,
    isFinalOnly,
    setIsFinalOnly,
    ...pagination,
  };
}
