"use client";

import { PageBlock } from "@/infrastructure/page-block";
import { useI18n } from "@infrastructure/user-i18n";
import { LanguageSelector } from "@infrastructure/user-i18n/language-selector";

const Home = () => {
  const { lang, setLang, getNamespaceData } = useI18n();
  const homePagecommonNamespace = getNamespaceData("homePage_common");
  const homePageItemsNamespace = getNamespaceData("homePage_items");

  return (
    <main className="p-4">
      <LanguageSelector lang={lang} onChange={setLang} />

      <PageBlock
        title={homePagecommonNamespace?.implemented}
        items={[
          { title: homePageItemsNamespace?.page1, href: "/" },
          { title: homePageItemsNamespace?.page2, href: "/" },
          { title: homePageItemsNamespace?.page3, href: "/" },
        ]}
      />
      <PageBlock
        title={homePagecommonNamespace?.inProgress}
        items={[
          { title: homePageItemsNamespace?.mhWilds, href: "/mh-wilds" },
          { title: homePageItemsNamespace?.page2, href: "/" },
          { title: homePageItemsNamespace?.page3, href: "/" },
        ]}
      />
      <PageBlock
        title={homePagecommonNamespace?.planned}
        items={[
          { title: homePageItemsNamespace?.page1, href: "/" },
          { title: homePageItemsNamespace?.page2, href: "/" },
          { title: homePageItemsNamespace?.page3, href: "/" },
        ]}
      />
    </main>
  );
};

export default Home;
