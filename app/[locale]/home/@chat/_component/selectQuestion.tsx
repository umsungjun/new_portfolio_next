import useSWR from "swr";
import { useLocale, useTranslations } from "next-intl";
import { Answer, Question } from "@prisma/client";
import { LOCALE_KO } from "@/lib/client/constants";
import { useChatStore } from "@/store/useChatStore";

interface QuestionResponse {
  success: boolean;
  data: Question[];
}

export default function SelectQuestion() {
  /* 현재 설정 된 언어 값 */
  const locale = useLocale();
  const t = useTranslations();
  const { setChatHistory } = useChatStore();

  const { data, isLoading, error } = useSWR<QuestionResponse>("/api/question");

  /* ToDo 에러 처리 */
  if (error) {
    return null;
  }

  const getAnswer = async (id: number) => {
    const response = await fetch(`/api/answer`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      data.data.forEach((answer: Answer) => {
        setChatHistory(answer);
      });
    }
  };

  return (
    <div className="questionWrapper">
      <div className="questionButtonBox">
        <span>{t("chatSelectQuestion")}</span>
        {isLoading ? (
          /* ToDo 로딩 처리 */
          <></>
        ) : (
          <>
            {data?.data.map((option) => {
              return (
                <button key={option.id} onClick={() => getAnswer(option.id)}>
                  {locale === LOCALE_KO ? option.contentKo : option.contentEn}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
