import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
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
  /* middleware를 실행시킬 페이지 
    "/" 꼭 붙여야 함
    /user/:path* <- user path로 시작하는 곳에 전부 적용
    matcher: ["/", "/profile", "/create-account", "/user/:path*"]
  */

  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
