import useSWR from "swr";
import { useLocale, useTranslations } from "next-intl";
import { Answer, Question } from "@prisma/client";
import { LOCALE_KO } from "@/lib/client/constants";
import { useChatStore } from "@/store/useChatStore";
import { useState } from "react";

interface QuestionResponse {
  success: boolean;
  data: Question[];
  shownQuestionIds: number[];
}

interface SelectQuestionProps {
  shownQuestionIds: number[];
}

export default function SelectQuestion({
  shownQuestionIds,
}: SelectQuestionProps) {
  /* 현재 설정 된 언어 값 */
  const locale = useLocale();
  const t = useTranslations();
  const { setChatHistory } = useChatStore();

  /* 질문 리스트 숨김 상태 */
  const [isHidden, setIsHidden] = useState(false);

  const { data, isLoading, error } = useSWR<QuestionResponse>("/api/question");

  /* ToDo 에러 처리 */
  if (error || !data) {
    return null;
  }

  const getAnswer = async (question: Question) => {
    setIsHidden(true);
    const response = await fetch(`/api/answer`, {
      method: "POST",
      body: JSON.stringify({ id: question.id }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      /* 질문 추가 */
      setChatHistory(question);
      /* 답변 추가 */
      data.data.forEach((answer: Answer) => {
        setChatHistory(answer);
      });

      setIsHidden(false);
    }
  };

  // 질문 목록 필터링하여 렌더링
  const filteredQuestions = data.data.filter(
    (question) => !shownQuestionIds.includes(question.id)
  );

  if (filteredQuestions.length === 0 || isHidden) return null;

  return (
    <div className="questionWrapper">
      <div className="questionButtonBox">
        <span>{t("chatSelectQuestion")}</span>
        {isLoading ? (
          /* ToDo 로딩 처리 */
          <></>
        ) : (
          <>
            {filteredQuestions.map((question) => {
              /* 이미 선택된 질문은 비노출 */
              if (shownQuestionIds.includes(question.id)) {
                return null;
              }
              return (
                <button key={question.id} onClick={() => getAnswer(question)}>
                  {locale === LOCALE_KO
                    ? question.contentKo
                    : question.contentEn}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
