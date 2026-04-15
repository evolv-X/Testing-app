import { QuestionElement, type Question } from "../QuestionElement";
import type { QuestionResult } from "../../../../types/testing";
import { observer } from "mobx-react-lite";

export type AnswersState = Record<number, string | string[]>;

type QuestionBlockProps = {
  questions: Question[];
  loading: boolean;
  error: string;
  testId: number;
  answers: AnswersState;
  onChange: (id: number, value: any) => void;
  showResult?: boolean;
  results?: QuestionResult[];
};

const QuestionBlock = observer((props: QuestionBlockProps) => {
  const {
    questions,
    loading,
    error,
    testId,
    answers,
    onChange,
    showResult,
    results,
  } = props;

  if (loading) return <div className="custom-loader"></div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (questions.length === 0) return <p>Вопросы не найдены</p>;

  return (
    <div>
      <h2>StudentTestPage {testId}</h2>
      <ul>
        {questions.map((q) => (
          <QuestionElement
            key={q.id}
            q={q}
            value={answers[q.id] ?? (q.type === "multiple" ? [] : "")}
            onChange={onChange}
          />
        ))}
      </ul>
      {showResult && results && (
        <div>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            Результаты: {results.reduce((acc, r) => acc + r.score, 0)} /{" "}
            {results.reduce((acc, r) => {
              const q = questions.find((q) => q.id === r.questionId);
              return acc + (q?.score || 0);
            }, 0)}
          </p>
        </div>
      )}
    </div>
  );
});

export default QuestionBlock;
