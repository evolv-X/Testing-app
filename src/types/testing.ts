export type Attempt = {
  id: number;
  testId: number;
  userId: number;
  timeSpent: number;
  score: number;
  startedAt: string;
  finishedAt: string;
  status: "in_progress" | "completed" | "graded";
};

export type TestMeta = {
  project: string;
  course: string;
  track: number;
  purpose: string;
};

export type TestResult = {
  id: number;
  title: string;
  shortDescription: string;
  passScore: number;
  attemptsAllowed: number;
  lastAttempt: number | null;
  durationSec: number;
  allowRetry: boolean;
  deadlineISO: string;
  tags: string[];
  meta: TestMeta;
  attempt: Attempt;
};
