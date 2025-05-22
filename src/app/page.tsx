"use client";

import { PageBlock } from "@/infrastructure/page-block";
import { useI18n } from "@infrastructure/user-i18n";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { getNamespaceData } = useI18n();
  const homePagemhCommonNamespace = getNamespaceData("homePage_common");
  const homePageItemsNamespace = getNamespaceData("homePage_items");

  useEffect(() => {
    redirect("/mh-wilds");
  }, []);

  return (
    <main className="p-4">
      <PageBlock
        title={homePagemhCommonNamespace?.implemented}
        items={[
          { pageTitle: homePageItemsNamespace?.page1, pageHref: "/" },
          { pageTitle: homePageItemsNamespace?.page2, pageHref: "/" },
          { pageTitle: homePageItemsNamespace?.page3, pageHref: "/" },
        ]}
      />
      <PageBlock
        title={homePagemhCommonNamespace?.inProgress}
        items={[
          { pageTitle: homePageItemsNamespace?.mhWilds, pageHref: "/mh-wilds" },
          { pageTitle: homePageItemsNamespace?.page2, pageHref: "/" },
          { pageTitle: homePageItemsNamespace?.page3, pageHref: "/" },
        ]}
      />
      <PageBlock
        title={homePagemhCommonNamespace?.planned}
        items={[
          { pageTitle: homePageItemsNamespace?.page1, pageHref: "/" },
          { pageTitle: homePageItemsNamespace?.page2, pageHref: "/" },
          { pageTitle: homePageItemsNamespace?.page3, pageHref: "/" },
        ]}
      />
    </main>
  );
};

export default Home;
