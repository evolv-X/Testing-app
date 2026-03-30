import { makeAutoObservable, runInAction } from "mobx";
import type { Attempt, TestResult } from "../../../../types/testing";

export type Filters = {
  search: string;
  tags: string[];
};

export class TestsCatalogStore {
  tests: TestResult[] = [];
  attempts: Attempt[] = [];

  isLoading = false;
  error: string | null = null;

  filters: Filters = { search: "", tags: [] };
  user: any = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  get publishedTests() {
    return this.tests.filter((test) => test.isPublished);
  }

  get latestAttempts() {
    const map = new Map<number, Attempt>();

    this.attempts.forEach((attempt) => {
      const current = map.get(attempt.testId);
      if (
        !current ||
        new Date(attempt.finishedAt) > new Date(current.finishedAt)
      ) {
        map.set(attempt.testId, attempt);
      }
    });

    return map;
  }
  async load() {
    this.isLoading = true;
    this.error = null;

    try {
      const [testsRes, attemptsRes] = await Promise.all([
        fetch("/data/tests.json"),
        fetch("/data/attempts.json"),
      ]);

      if (!testsRes.ok || !attemptsRes.ok) {
        throw new Error("fetch error");
      }

      const [testsData, attemptsData] = await Promise.all([
        testsRes.json(),
        attemptsRes.json(),
      ]);

      if (!Array.isArray(testsData) || !Array.isArray(attemptsData)) {
        throw new Error("data incorrect");
      }

      runInAction(() => {
        this.tests = testsData;
        this.attempts = attemptsData;
        this.isLoading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message;
        this.isLoading = false;
      });
    }
  }
}
