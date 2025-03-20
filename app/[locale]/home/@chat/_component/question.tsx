interface QuestionProps {
  showMark?: boolean;
  text: string;
}

export default function Question({ showMark = true, text }: QuestionProps) {
  return (
    <div className="questionWrapper">
      {/* id:2 두 번째 고정 메시지 */}
      {showMark && <div className="questionMark">Q</div>}
      <p>{text}</p>
    </div>
  );
}
