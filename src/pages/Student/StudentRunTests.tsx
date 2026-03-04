import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import QuestionBlock from "./components/test/QuestionBlock";
import { TimerBox } from "./components/ui/TimerBox";
import { useLocation, useParams } from "react-router-dom";
import type { Question, TestResult } from "../../types/testing";
import { ConfirmModal } from "./components/test/ConfirmModal";

const Layout = styled.div``;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
`;

export function StudentRunTests() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testData, setTestData] = useState<TestResult | null>(null);
  const [duration, setDuration] = useState(testData?.durationSec);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const testId = Number(params.id);
  const { state } = useLocation();

  const [timeLeftSec, setTimeLeftSec] = useState(state.durationSec);
  const durationSec = testData?.durationSec ?? 600;

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
    const result = durationSec - timeLeftSec;
    console.log("result", result);
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
        />
        {duration != null && (
          <TimerBox
            durationSec={duration}
            onTick={() => setTimeLeftSec}
            onFinish={() => {
              alert("Тест завершён! Ваши ответы сохранены.");
              handleSubmit();
            }}
          />
        )}
      </Content>
      <button onClick={() => setIsOpenModal(true)}>Отправить</button>
      <ConfirmModal
        open={isOpenModal}
        onClose={(v) => setIsOpenModal(v)}
        onSuccess={() => onSubmit()}
        title={"Хотите закончить тестирование?"}
      />
    </Layout>
  );
}
