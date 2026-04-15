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
    console.log(2, timeLeftSec);
    if (timeLeftSec === null) {
      return;
    }
    this.uiStateLoading.remainingTime = timeLeftSec;
    // console.log(this.uiStateLoading.remainingTime);
  }

  set showResult(showResult: boolean) {
    this.uiStateLoading.finished = showResult;
  }

  set finished(finished: boolean) {
    this.uiStateLoading.finished = finished;
  }

  setAnswer(questionId: number, value: string | string[]) {
    console.log(questionId, value);
    this.answers[questionId] = value;
    console.log(this.answers);
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

  //   async start() {
  //     this.uiStateLoading.isLoading = true;
  //     this.uiStateLoading.error = "";
  //     this.uiStateLoading.finished = false;
  //   }

  async start(testId: number) {
    this.reset();
    this.testId = testId;
    this.uiStateLoading.isLoading = true;
    await this.load();
    // console.log(this.tests);
    const testFound = this.tests.find((t) => t.id === testId);
    // console.log(testFound);
    runInAction(() => {
      this.questions = this.filtredQuestions;
      this.test = testFound;
      if (testFound) {
        console.log(1, testFound.durationSec);
        this.setTimeLeftSec(testFound.durationSec);
      }
      this.uiStateLoading.isLoading = false;
    });
  }

  async load() {
    this.uiStateLoading.isLoading = true;
    this.uiStateLoading.error = "";
    // console.log("НАЧАЛО ЗАГРУЗКИ");

    try {
      const [testsRes, attemptsRes, questionsRes] = await Promise.all([
        fetch("/data/tests.json"),
        fetch("/data/attempts.json"),
        fetch("/data/questions.json"),
      ]);

      if (!testsRes.ok || !attemptsRes.ok || !questionsRes.ok) {
        throw new Error("fetch error");
      }

      const [testsData, attemptsData, questionsData] = await Promise.all([
        testsRes.json(),
        attemptsRes.json(),
        questionsRes.json(),
      ]);

      // console.log("ДАННЫЕ ПОЛУЧЕНЫ", testsRes, attemptsRes, questionsRes);
      // console.log("ДАННЫЕ JSON", testsData, attemptsData, questionsData);

      if (
        !Array.isArray(testsData) ||
        !Array.isArray(attemptsData) ||
        !Array.isArray(questionsData)
      ) {
        throw new Error("data incorrect");
      }

      runInAction(() => {
        this.tests = testsData;
        // console.log("ДАННЫЕ", this.tests);
        this.attempts = attemptsData;
        // console.log("ДАННЫЕ", this.attempts);
        this.questions = questionsData;
      });
    } catch (e: any) {
      this.uiStateLoading.error =
        e instanceof Error ? e.message : "Ошибка загрузки";
      // console.log(e);
      runInAction(() => {
        this.uiStateLoading.error = e.message;
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
      console.log(this.durationSec);
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
