"use client";

import { PageBlock } from "@/infrastructure/page-block";
import { useI18n } from "@infrastructure/user-i18n";
import { LanguageSelector } from "@infrastructure/user-i18n/language-selector";

const Home = () => {
  const { lang, setLang, t } = useI18n();

  return (
    <main className="p-4">
      <LanguageSelector lang={lang} onChange={setLang} />

      <PageBlock
        title={t("common", "implemented")}
        items={[
          { title: t("common", "page1"), href: "/" },
          { title: t("common", "page2"), href: "/" },
          { title: t("common", "page3"), href: "/" },
        ]}
      />
      <PageBlock
        title={t("common", "inProgress")}
        items={[
          { title: t("common", "mhWilds"), href: "/mh-wilds" },
          { title: t("common", "page2"), href: "/" },
          { title: t("common", "page3"), href: "/" },
        ]}
      />
      <PageBlock
        title={t("common", "planned")}
        items={[
          { title: t("common", "page1"), href: "/" },
          { title: t("common", "page2"), href: "/" },
          { title: t("common", "page3"), href: "/" },
        ]}
      />
    </main>
  );
};

export default Home;
