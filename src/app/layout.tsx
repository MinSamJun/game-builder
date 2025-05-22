"use client";

import "./globals.css";
import { Suspense } from "react";
import { I18nProvider, useI18n } from "@infrastructure/user-i18n";
import { SidebarLayout } from "@/components/side-bar-layout";
import { LanguageSelector } from "@infrastructure/user-i18n/language-selector";

function LanguageSelectorWrapper() {
  const { lang, setLang } = useI18n();
  return <LanguageSelector lang={lang} onChange={setLang} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <I18nProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <SidebarLayout>
              <div className="mb-6 flex justify-end">
                <LanguageSelectorWrapper />
              </div>
              {children}
            </SidebarLayout>
          </Suspense>
        </I18nProvider>
      </body>
    </html>
  );
}
