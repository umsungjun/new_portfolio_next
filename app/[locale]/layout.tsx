import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

interface LocaleLayoutParams {
  locale: string;
}

export const metadata: Metadata = {
  title: "프론트엔드 개발자 엄성준 포트폴리오",
  description:
    "꾸준함이 강점이자 자랑인 프론트엔드 개발자 엄성준 포트폴리오입니다.",
  keywords: [
    "프론트엔드 개발자",
    "엄성준",
    "포트폴리오",
    "frontend developer",
    "umsungjun",
    "portfolio",
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: LocaleLayoutParams;
}>) {
  const { locale } = await params;

  /* locale을 인자로 전달해야 정상적으로 언어가 변경 됨 */
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
