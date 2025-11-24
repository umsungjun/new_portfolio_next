import "../globals.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { SwrProviders } from "@/components/swrProvider";
import { LOCALE_KO } from "@/lib/client/constants";
import { localeType } from "@/lib/client/type";

interface LocaleLayoutParams {
  locale: localeType;
}

export async function generateMetadata({
  params,
}: {
  params: LocaleLayoutParams;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === LOCALE_KO
        ? "프론트엔드 개발자 엄성준 Next 포트폴리오"
        : "Frontend Developer Sungjun Um Next Portfolio",
    description:
      locale === LOCALE_KO
        ? "꾸준함이 강점이자 자랑인 프론트엔드 개발자 엄성준 Next 포트폴리오입니다."
        : "This is the Next portfolio of Frontend Developer Sungjun Um, whose strength and pride is consistency.",
    keywords: [
      "프론트엔드 개발자",
      "엄성준",
      "포트폴리오",
      "frontend developer",
      "umsungjun",
      "portfolio",
    ],
    icons: {
      icon: "/favicon.ico",
    },
    verification: {
      google: "FkVxpqkKnBQlSm1tgTF-GyQP0GLfhX_z03E6h21lipo",
    },
  };
}

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
        <SwrProviders>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SwrProviders>
      </body>
    </html>
  );
}
