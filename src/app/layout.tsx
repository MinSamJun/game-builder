import "./globals.css";
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
          <SidebarLayout>{children}</SidebarLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
