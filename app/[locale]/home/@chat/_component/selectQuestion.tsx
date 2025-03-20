import { useTranslations } from "next-intl";

export default function SelectQuestion() {
  const t = useTranslations();

  return (
    <div className="questionWrapper">
      <div className="questionButtonBox">
        <span>{t("chatSelectQuestion")}</span>
        {/* {options?.map((option) => {
          return (
            <button
              key={option.id}
              onClick={() =>
                handleSelectQuestion({
                  id: option.id,
                  type: option.type,
                  answerKey: option.answerKey,
                  createdAt: new Date(),
                  text: option.text,
                })
              }
            >
              {t(option.text)}
            </button>
          );
        })} */}
      </div>
    </div>
  );
}
