interface QuestionProps {
  showMark?: boolean;
  text: string;
}

export default function Question({ showMark = true, text }: QuestionProps) {
  return (
    <div className="questionWrapper">
      {showMark && <div className="questionMark">Q</div>}
      <p>{text}</p>
    </div>
  );
}
