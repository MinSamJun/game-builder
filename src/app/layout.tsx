import "./globals.css";
import { I18nProvider } from "@infrastructure/user-i18n";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
