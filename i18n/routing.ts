import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  /* 지원하는 언어 설정 */
  locales: ["ko", "en"],
  /* 기본 언어 설정 */
  defaultLocale: "ko",
});

/* export const { Link, redirect, usePathname, useRouter } = createNavigation(routing); 코드는 Next.js의 Link, redirect, usePathname, useRouter를 사용할 수 있도록 래핑한 것입니다. 이를 사용하여 기존 next j에서 제공하는 API를 대체할 수 있습니다. */
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
