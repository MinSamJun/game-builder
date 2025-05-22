"use client";

import { PageBlock } from "@/infrastructure/page-block";
import { useI18n } from "@infrastructure/user-i18n";

export default function Mhwilds() {
  const { getNamespaceData } = useI18n();
  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common");

  return (
    <main className="p-4">
      <PageBlock
        title={mhCommonNamespace?.mh_common_mhWilds}
        items={[
          {
            pageTitle: mhCommonNamespace?.mh_common_simulator,
            pageHref: "/mh-wilds/simulator",
          },
          {
            pageTitle: mhCommonNamespace?.mh_common_weapon,
            pageHref: "/mh-wilds/weapon",
          },
          {
            pageTitle: mhCommonNamespace?.mh_common_armor_charm,
            pageHref: "/mh-wilds/armor-charm",
          },
          {
            pageTitle: mhWildsCommonNamespace?.mhwilds_common_skills,
            pageHref: "/mh-wilds/skills",
          },
          {
            pageTitle: mhCommonNamespace?.mh_common_decoration,
            pageHref: "/mh-wilds/deco",
          },
        ]}
      />
    </main>
  );
}
