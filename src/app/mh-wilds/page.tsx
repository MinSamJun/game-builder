"use client";

import { PageBlock } from "@/infrastructure/page-block";
import { useI18n } from "@infrastructure/user-i18n";
import { LanguageSelector } from "@infrastructure/user-i18n/language-selector";

export default function Mhwilds() {
  const { lang, setLang, getNamespaceData } = useI18n();
  const mhCommonNamespace = getNamespaceData("mh_common");

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
        ]}
      />
    </main>
  );
}
