"use client";

import { PageBlock } from "@/infrastructure/page-block";
import { useI18n } from "@infrastructure/user-i18n";
import { LanguageSelector } from "@infrastructure/user-i18n/language-selector";

export default function Mhwilds() {
  const { lang, setLang, getNamespaceData } = useI18n();
  const mhCommonNamespace = getNamespaceData("mh_common");
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common");

  return (
    <main className="p-4">
      <LanguageSelector lang={lang} onChange={setLang} />

      <PageBlock
        title={mhCommonNamespace?.mh_common_mhWilds}
        items={[
          {
            title: mhCommonNamespace?.mh_common_armor_charm,
            href: "/mh-wilds/armor-charm",
          },
          {
            title: mhWildsCommonNamespace?.mhWilds_common_armor_skill,
            href: "/mh-wilds/armor-charm-skill",
          },
          {
            title: mhCommonNamespace?.mh_common_weapon,
            href: "/mh-wilds/weapon",
          },
        ]}
      />
    </main>
  );
}
