import { makeAutoObservable, runInAction } from "mobx";
import type { NavigateFunction } from "react-router-dom";
import type {
  Attempt,
  Question,
  QuestionResult,
  TestResult,
  UiStateLoading,
} from "../../../types/testing";
import { checkQuestion } from "../../../utils/checkQuestion";

export class TestRunStore {
  testId: number = 0;
  tests: TestResult[] = [];
  attempts: Attempt[] = [];
  test: TestResult | undefined;
  questions: Question[] = [];
  answers: Record<number, string | string[]> = {};
  uiStateLoading: UiStateLoading;
  testResults: QuestionResult[] = [];
  correctCount: number = 0;
  constructor() {
    this.uiStateLoading = {
      isLoading: false,
      error: "",
      finished: false,
      remainingTime: 0,
    };
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTimeLeftSec(timeLeftSec: number | null) {
    if (timeLeftSec === null) {
      return;
    }
    this.uiStateLoading.remainingTime = timeLeftSec;
  }

  set showResult(showResult: boolean) {
    this.uiStateLoading.finished = showResult;
  }

  set finished(finished: boolean) {
    this.uiStateLoading.finished = finished;
  }

  setAnswer(questionId: number, value: string | string[]) {
    this.answers[questionId] = value;
  }

  reset() {
    this.answers = {};
    this.uiStateLoading = {
      isLoading: false,
      error: "",
      finished: false,
      remainingTime: 0,
    };
    this.correctCount = 0;
    this.testResults = [];
  }

  evaluateResults() {
    this.correctCount = 0;
    this.testResults = this.questions
      .filter((q: Question) => q.testId === this.testId)
      .map((q: Question) => {
        const userAnswer = this.answers[q.id];
        const checkRes = checkQuestion(q, userAnswer);

        if (checkRes.status === "correct") {
          this.correctCount += checkRes.score;
        }

        return {
          questionId: q.id,
          score: checkRes.score,
          correctAnswer: q.correct,
          userAnswer: userAnswer,
          isCorrect: checkRes.status === "correct",
          maxScore: checkRes.maxScore,
        };
      });
  }

  async start(testId: number) {
    this.reset();
    this.testId = testId;
    this.uiStateLoading.isLoading = true;
    await this.load();
    const testFound = this.tests.find((t) => t.id === testId);
    runInAction(() => {
      this.questions = this.filtredQuestions;
      this.test = testFound;
      if (testFound) {
        this.setTimeLeftSec(testFound.durationSec);
      }
      this.uiStateLoading.isLoading = false;
    });
  }

  async load() {
    this.uiStateLoading.isLoading = true;
    this.uiStateLoading.error = "";

    try {
      const [testsRes, attemptsRes, questionsRes] = await Promise.all([
        fetch("/Testing-app/data/tests.json"),
        fetch("/Testing-app/data/attempts.json"),
        fetch("/Testing-app/data/questions.json"),
      ]);

      if (!testsRes.ok || !attemptsRes.ok || !questionsRes.ok) {
        throw new Error("fetch error");
      }

      const [testsData, attemptsData, questionsData] = await Promise.all([
        testsRes.json(),
        attemptsRes.json(),
        questionsRes.json(),
      ]);

      if (
        !Array.isArray(testsData) ||
        !Array.isArray(attemptsData) ||
        !Array.isArray(questionsData)
      ) {
        throw new Error("data incorrect");
      }

      runInAction(() => {
        this.tests = testsData;
        this.attempts = attemptsData;
        this.questions = questionsData;
      });
    } catch (e: any) {
      runInAction(() => {
        this.uiStateLoading.error =
          e instanceof Error ? e.message : "Ошибка загрузки";
        this.uiStateLoading.isLoading = false;
      });
    }
  }

  get durationSec() {
    return this.test?.durationSec ?? 2000;
  }

  get isLoading() {
    return this.uiStateLoading.isLoading;
  }

  get error() {
    return this.uiStateLoading.error;
  }

  submit(navigate: NavigateFunction) {
    this.finished = true;
    this.evaluateResults();

    if (this.test && this.test.attemptsAllowed > 1 && this.test.allowRetry) {
      navigate(`/student/tests/${this.testId}/result`, {
        replace: true,
        state: {
          resultMax: this.maxScore,
          resultAnswer: this.totalScore,
          durationSec: this.uiStateLoading.remainingTime,
          resultTime: this.spentSec,
          attemptsAllowed: this.test.attemptsAllowed,
        },
      });
    }
  }
  // тут durationSec

  get filtredQuestions() {
    return this.questions.filter((q) => q.testId === this.testId);
  }

  get answeredCount() {
    return Object.keys(this.answers).length;
  }

  get totalCount() {
    return this.filtredQuestions.length;
  }

  get allAnswered() {
    return this.answeredCount === this.totalCount;
  }

  get result() {
    return this.testResults;
  }

  get totalScore() {
    return this.testResults.reduce((acc, cur) => acc + cur.score, 0);
  }

  get maxScore() {
    return this.testResults.reduce((acc, cur) => acc + cur.maxScore, 0);
  }

  get spentSec() {
    return (this.test?.durationSec ?? 0) - this.uiStateLoading.remainingTime;
  }
}
