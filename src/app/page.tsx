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
        title={t("homePage_common", "implemented")}
        items={[
          { title: t("homePage_items", "page1"), href: "/" },
          { title: t("homePage_items", "page2"), href: "/" },
          { title: t("homePage_items", "page3"), href: "/" },
        ]}
      />
      <PageBlock
        title={t("homePage_common", "inProgress")}
        items={[
          { title: t("homePage_items", "mhWilds"), href: "/mh-wilds" },
          { title: t("homePage_items", "page2"), href: "/" },
          { title: t("homePage_items", "page3"), href: "/" },
        ]}
      />
      <PageBlock
        title={t("homePage_common", "planned")}
        items={[
          { title: t("homePage_items", "page1"), href: "/" },
          { title: t("homePage_items", "page2"), href: "/" },
          { title: t("homePage_items", "page3"), href: "/" },
        ]}
      />
    </main>
  );
};

export default Home;
