"use client";
import React from "react";
import { PageBlock } from "@/infrastructure/page-block";
import { useI18n } from "@infrastructure/user-i18n";
import Link from "next/link";

export const SideBarContent = ({
  slug,
  toggleSidebar,
}: {
  slug: string;
  toggleSidebar: () => void;
}) => {
  const { getNamespaceData } = useI18n();
  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common");

  const [segment1] = slug.split("/");

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-white hover:underline">
          home
        </Link>
        <button
          onClick={toggleSidebar}
          className="px-2 py-1 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded"
        >
          ◀
        </button>
      </div>

      {segment1 === "mh-wilds" && (
        <PageBlock
          title={mhCommonNamespace?.mh_common_mhWilds}
          items={[
            {
              pageTitle: mhCommonNamespace?.mh_common_armor_charm,
              pageHref: "/mh-wilds/armor-charm",
            },
            {
              pageTitle: mhWildsCommonNamespace?.mhWilds_common_armor_skill,
              pageHref: "/mh-wilds/armor-charm-skill",
            },
            {
              pageTitle: mhCommonNamespace?.mh_common_weapon,
              pageHref: "/mh-wilds/weapon",
            },
            {
              pageTitle: mhCommonNamespace?.mh_common_decoration,
              pageHref: "/mh-wilds/deco",
            },
          ]}
        />
      )}
    </main>
  );
};
