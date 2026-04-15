import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import QuestionBlock from "./components/test/QuestionBlock";
import TimerBox from "./components/ui/TimerBox";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../Store/useStore";
import { observer } from "mobx-react-lite";
import { Modal } from "../../components/Modal";

const Layout = styled.div``;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
`;

export const StudentRunTests = observer(() => {
  const { testRunPageVM } = useStore();
  const params = useParams();
  const testId = Number(params.id);
  const navigate = useNavigate();
  useEffect(() => {
    testRunPageVM.init(testId);
  }, [testId, testRunPageVM]);
  const {
    uiStateLoading,
    questions,
    answers,
    showResult,
    result,
    durationSec,
    setAnswer,
    setTimeLeftSec,
    submit,
  } = testRunPageVM.rootStore.testRunStore;

  // console.log(uiStateLoading);

  const { isLoading, error } = uiStateLoading;

  if (isLoading) {
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
          questions={questions}
          loading={isLoading}
          error={error}
          testId={testId}
          answers={answers}
          onChange={(id, value) => setAnswer(id, value)}
          showResult={showResult}
          results={result}
        />
        {durationSec != null && (
          <TimerBox
            durationSec={durationSec}
            finished={showResult}
            onTick={(timeLeft: number | null) => setTimeLeftSec(timeLeft)}
            onFinish={() => {
              alert("Тест завершён! Ваши ответы сохранены.");
              submit(navigate);
            }}
          />
        )}
      </Content>
      {!showResult && (
        <button onClick={() => testRunPageVM.requestFinish(navigate)}>
          Отправить
        </button>
      )}
    </Layout>
  );
});
