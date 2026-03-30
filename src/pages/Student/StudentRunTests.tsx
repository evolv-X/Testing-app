import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import QuestionBlock, {
  type AnswersState,
} from "./components/test/QuestionBlock";
import { TimerBox } from "./components/ui/TimerBox";
import { useNavigate, useParams } from "react-router-dom";
import type { Question, TestResult, QuestionResult } from "../../types/testing";
import { ConfirmModal } from "./components/test/ConfirmModal";
import { checkQuestion } from "../../utils/checkQuestion";

const Layout = styled.div``;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
`;

export function StudentRunTests() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [testData, setTestData] = useState<TestResult | null>(null);
  const [duration, setDuration] = useState(testData?.durationSec);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const testId = Number(params.id);
  const navigate = useNavigate();

  const durationSec = testData?.durationSec ?? 600;
  const [timeLeftSec, setTimeLeftSec] = useState(durationSec);

  const onSubmit = () => {
    console.log("onSubmit");
    handleSubmit();
  };

  console.log("открыто", isOpenModal);

  useEffect(() => {
    if (!testData) return;
    setTimeLeftSec(durationSec);
  }, [testData]);

  useEffect(() => {
    const data = "/data/questions.json";

    fetch(data)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP: ${response.status}`);
        return response.json();
      })
      .then((data: Question[]) => {
        setQuestions(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [testId]);

  const filtredQuestions = useMemo(
    () => questions.filter((q) => q.testId === testId),
    [testId, questions],
  );

  useEffect(() => {
    const data = "/data/tests.json";

    fetch(data)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP: ${response.status}`);
        return response.json();
      })
      .then((tests: TestResult[]) => {
        const filtredTest = tests.find((t) => t.id === testId);
        setTestData(filtredTest ?? null);
        setDuration(filtredTest?.durationSec ?? 600);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [testId]);

  function handleSubmit() {
    // потом чтобы высчитать durationSec - timeLeftSec : итог времени теста
    const resultTime = durationSec - timeLeftSec;

    let correctCount = 0;
    const testResults: QuestionResult[] = filtredQuestions.map((q) => {
      const answer = answers[q.id];
      const checkRes = checkQuestion(q, answer);

      if (checkRes.status === "correct") {
        correctCount += checkRes.score;
      }

      return {
        questionId: q.id,
        score: checkRes.score,
        correctAnswer: q.correct,
        userAnswer: answer,
        isCorrect: checkRes.status === "correct",
        maxScore: checkRes.maxScore,
      };
    });

    setIsOpenModal(false);
    setResults(testResults);
    setShowResult(true);

    const resultAnswer = testResults.reduce((acc, cur) => acc + cur.score, 0);

    const resultMax = testResults.reduce((acc, cur) => acc + cur.maxScore, 0);

    console.log(resultAnswer);
    console.log(resultMax);

    // console.log('Answers Result Object:', testResults);
    // console.log(`${correctCount}/${filtredQuestions.length}`);
    // console.log('result time', resultTime);

    if (testData && testData.attemptsAllowed > 1 && testData.allowRetry) {
      navigate(`/student/tests/${testId}/result`, {
        replace: true,
        state: {
          resultMax,
          resultAnswer,
          durationSec: timeLeftSec,
          resultTime,
          attemptsAllowed: testData.attemptsAllowed,
        },
      });
    }
  }

  if (loading) {
    return (
      <Layout>
        <header>Test 100</header>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <header>Test 100</header>
        <div style={{ color: "red" }}>{error}</div>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <header>Test 100</header>
        <div style={{ color: "red" }}>Вопросы не найдены</div>
      </Layout>
    );
  }

  if (Number.isNaN(testId)) {
    return (
      <Layout>
        <header>Test 100</header>
        <div>Неверный ID теста</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <header>Test 100</header>
      <Content>
        <QuestionBlock
          questions={filtredQuestions}
          loading={loading}
          error={error}
          testId={testId}
          answers={answers}
          onChange={(id, value) =>
            setAnswers((prev) => ({ ...prev, [id]: value }))
          }
          showResult={showResult}
          results={results}
        />
        {duration != null && (
          <TimerBox
            durationSec={duration}
            finished={showResult}
            onTick={(timeLeft) => setTimeLeftSec(timeLeft)}
            onFinish={() => {
              alert("Тест завершён! Ваши ответы сохранены.");
              handleSubmit();
            }}
          />
        )}
      </Content>
      {!showResult && (
        <button onClick={() => setIsOpenModal(true)}>Отправить</button>
      )}
      <ConfirmModal
        open={isOpenModal}
        onClose={(v) => setIsOpenModal(v)}
        onSuccess={() => onSubmit()}
        title={"Хотите закончить тестирование?"}
      />
    </Layout>
  );
}
