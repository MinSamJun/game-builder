import "./globals.css";
import { Suspense } from "react";
import { I18nProvider } from "@infrastructure/user-i18n";
import { SidebarLayout } from "@/components/side-bar-layout";

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
            <SidebarLayout>{children}</SidebarLayout>
          </Suspense>
        </I18nProvider>
      </body>
    </html>
  );
}
