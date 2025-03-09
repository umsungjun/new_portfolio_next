import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  /* 지워하는 언어만 라우팅 */
  matcher: ["/", "/(ko|en)/:path*"],
};
