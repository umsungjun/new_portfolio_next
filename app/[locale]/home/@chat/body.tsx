"use client";

import { useLocale } from "next-intl";
import { useChatStore } from "@/store/useChatStore";
import { LOCALE_KO } from "@/lib/client/constants";

import Question from "./_component/question";
import SelectQuestion from "./_component/selectQuestion";

export default function ChatBody() {
  /* 현재 설정 된 언어 값 */
  const locale = useLocale();
  const { chatHistory } = useChatStore();

  return (
    <div
      className={`relative h-full px-5 pt-6 pb-20 max-h-dvh flex flex-col gap-4`}
    >
      {chatHistory.map((chat) => {
        if (chat.type === "QUESTION") {
          return (
            <Question
              key={chat.id}
              text={locale === LOCALE_KO ? chat.contentKo : chat.contentEn}
              /* 999는 고정 인삿말 이기 때문에 마크를 비노출 */
              showMark={chat.id !== 999}
            />
          );
        }
      })}
      {/* 질문 선택 리스트 */}
      <SelectQuestion />
    </div>
  );
}
