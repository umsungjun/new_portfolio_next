import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PulseLoader from "react-spinners/PulseLoader";
import YoutubePlayer from "react-player";
import { Answer as AnswerType } from "@prisma/client";
import { LOCALE_KO } from "@/lib/client/constants";

import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface AnswerProps {
  isRefresh: boolean;
  locale: string;
  chat: AnswerType;
}

const IMAGE_TYPE = "IMAGE";
const VIDEO_TYPE = "VIDEO";

export default function Answer({ isRefresh, locale, chat }: AnswerProps) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {!isRefresh && isLoading ? (
        <div className="answerLoader">
          <PulseLoader
            color="#3B82f6"
            size={10}
            loading={true}
            speedMultiplier={0.8}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="answer">
          <p className="whitespace-pre-line">
            <span className="font-black text-blue-600 pr-1">A.</span>
            {locale === LOCALE_KO ? chat.contentKo : chat.contentEn}
          </p>
          {/* 참고 이미지 */}
          {chat.mediaType === IMAGE_TYPE && chat.mediaUrl !== null && (
            <div>
              <span className="flex items-center gap-1 font-bold">
                <PhotoIcon className="size-5 text-green-500" />
                {t("referenceImage")}
              </span>
              <div className="relative mt-3 flex h-[200px] w-full">
                <Image
                  fill
                  src={`${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_IMG_URL}${chat.mediaUrl}&sz=w300`}
                  priority={true}
                  alt="referenceImage"
                  sizes="(max-width: 215px) 100vw"
                />
              </div>
            </div>
          )}
          {/* 참고 영상 */}
          {chat.mediaType === VIDEO_TYPE && chat.mediaUrl !== null && (
            <div className="mt-3 flex flex-col gap-3">
              <span className="flex items-center gap-1 font-bold">
                <VideoCameraIcon className="size-5 text-red-500" />
                {t("referenceVideo")}
              </span>
              <div className="videoPlayer flex justify-center ">
                <YoutubePlayer url={chat.mediaUrl} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
