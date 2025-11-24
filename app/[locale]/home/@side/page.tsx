import { getTranslations } from "next-intl/server";

import { localeType } from "@/lib/client/type";

/* 아이콘 */
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

import ProfileSwiper from "./profileSwiper";

interface SideProps {
  params: {
    locale: localeType;
  };
}

export default async function Side({ params }: SideProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <aside className="hidden max-w-[450px] w-[450px] h-screen items-center web:flex">
      <div className="w-full flex flex-col gap-10">
        {/* 제목 및 소개 */}
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl text-center font-medium">
            {t("portfolioTitle")}
          </h1>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">&ldquo;{t("introduce1")}</h3>
            <h3 className="text-2xl text-right">{t("introduce2")}&ldquo;</h3>
          </div>
        </div>
        {/* 연락처 */}
        <div className="flex gap-8">
          <div className="w-1/2">
            <h3 className="text-2xl font-bold">{t("contact")}</h3>
            <ul className="pt-8 flex flex-col gap-5">
              <li>
                <div className="flex items-center gap-1.5">
                  <DevicePhoneMobileIcon className="size-6" />
                  <h5 className="text-xl">{t("phone")}</h5>
                </div>
                <p className="mt-2 text-lg">
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                </p>
              </li>
              <li>
                <div className="flex items-center gap-1.5">
                  <EnvelopeIcon className="size-6" />
                  <h5 className="text-xl">{t("mail")}</h5>
                </div>
                <p className="mt-2 text-lg">{process.env.NEXT_PUBLIC_MAIL}</p>
              </li>
            </ul>
          </div>
          {/* 프로필 이미지 스와이퍼 */}
          <ProfileSwiper />
        </div>
        {/* git, blog 링크 */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold">{`${t("gitHub")} & ${t(
            "blog"
          )}`}</h3>
          <div className="flex w-full h-16 gap-24">
            <a
              className="w-32 h-full rounded-lg flex items-center gap-4"
              href="https://github.com/umsungjun"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                className="w-10"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              <span className="text-2xl font-black">{t("gitHub")}</span>
            </a>
            <a
              className="w-32 h-full rounded-lg flex items-center justify-center gap-4"
              href="https://developer-sungjun.tistory.com/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                className="w-10"
                viewBox="0 0 16 16"
              >
                <path d="M8.35 5.046a.615.615 0 0 0-.54.575c-.009.13-.006.14.289.899.67 1.727.833 2.142.86 2.2q.101.215.277.395c.089.092.148.141.247.208.176.117.262.15.944.351.664.197 1.026.327 1.338.482.405.201.688.43.866.7.128.195.242.544.291.896.02.137.02.44 0 .564-.041.27-.124.495-.252.684-.067.1-.044.084.055-.039.278-.346.562-.938.707-1.475a4.42 4.42 0 0 0-2.14-5.028 70 70 0 0 0-.888-.465l-.53-.277-.353-.184c-.16-.082-.266-.138-.345-.18-.368-.192-.523-.27-.568-.283a1 1 0 0 0-.194-.03z" />
                <path d="M9.152 11.493a3 3 0 0 0-.135.083 320 320 0 0 0-1.513.934l-.8.496c-.012.01-.587.367-.876.543a1.9 1.9 0 0 1-.732.257c-.12.017-.349.017-.47 0a1.9 1.9 0 0 1-.884-.358 2.5 2.5 0 0 1-.365-.364 1.9 1.9 0 0 1-.34-.76 1 1 0 0 0-.027-.121c-.005-.006.004.092.022.22.018.132.057.324.098.489a4.1 4.1 0 0 0 2.487 2.796c.359.142.72.23 1.114.275.147.016.566.023.72.011a4.1 4.1 0 0 0 1.956-.661l.235-.149.394-.248.258-.163 1.164-.736c.51-.32.663-.433.9-.665.099-.097.248-.262.255-.283.002-.005.028-.046.059-.091a1.64 1.64 0 0 0 .25-.682c.02-.124.02-.427 0-.565a3 3 0 0 0-.213-.758c-.15-.314-.47-.6-.928-.83a2 2 0 0 0-.273-.12c-.006 0-.433.26-.948.58l-1.113.687z" />
                <path d="m3.004 12.184.03.129c.089.402.245.693.515.963a1.82 1.82 0 0 0 1.312.543c.361 0 .673-.09.994-.287l.472-.29.373-.23V5.334c0-1.537-.003-2.45-.008-2.521a1.82 1.82 0 0 0-.535-1.177c-.097-.096-.18-.16-.427-.33L4.183.24c-.239-.163-.258-.175-.33-.2a.63.63 0 0 0-.842.464c-.009.042-.01.603-.01 3.646l.003 8.035Z" />
              </svg>
              <span className="text-2xl font-black">{t("blog")}</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
