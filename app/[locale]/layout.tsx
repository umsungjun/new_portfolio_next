import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";

import { notFound } from "next/navigation";

type Params = Promise<{ locale: never }>;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params; // next js 15버전부터 Params 사용시 비동기로 변경됨

  // 들어오는 `로케일`이 유효한지 확인하세요.
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // 클라이언트에게 모든 메시지 제공
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
