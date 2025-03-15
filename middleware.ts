import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { LOCALE_KO, SUPPORTED_LOCALES } from "./lib/constants";

export default createMiddleware(routing);

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1];

  if (!SUPPORTED_LOCALES.includes(locale)) {
    const url = new URL(`/${LOCALE_KO}`, request.url);
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
