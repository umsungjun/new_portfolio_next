import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";
import {
  LOCALE_EN,
  LOCALE_KO,
  SUPPORTED_LOCALES,
} from "./lib/client/constants";

export default createMiddleware(routing);

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1];

  if (pathname === `/${LOCALE_KO}` || pathname === `/${LOCALE_EN}`) {
    const newUrl = new URL(`${pathname}/home`, request.url);
    return NextResponse.redirect(newUrl);
  }

  if (!SUPPORTED_LOCALES.includes(locale)) {
    const url = new URL(`/${LOCALE_KO}/home`, request.url);
    return NextResponse.redirect(url);
  }
};

export const config = {
  /* 정규식 설명:
    - / : 루트 경로부터 시작
    - (?! ... ) : negative lookahead - 괄호 안의 패턴과 일치하지 않는 경우만 선택
  */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
