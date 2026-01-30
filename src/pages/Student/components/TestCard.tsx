import styled from "@emotion/styled";
import type { Attempt, TestResult } from "../../../types/testing";
import {
  DateIcon,
  RetryIcon,
  TimerIcon /*, RetryIcon*/,
} from "../../../icons/icons";
import { ScoreFlag } from "./ScoreFlag";

const Card = styled.article`
  padding: 34px 16px 15px 22px;
  border: 1px solid #dde2e4;
  border-radius: 12px;
  background-color: #fff;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 16px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: #0f172a;
`;

const Description = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.4;
  max-width: 760px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;

  border-radius: 999px;
  border: 1px solid #9cc6ff;
  color: #2f80ff;
  background: #f5faff;

  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
`;

const pillBase = `
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;

  svg { width: 18px; height: 18px; }
`;

const DateTest = styled.div`
  ${pillBase};
  background: #f59e0b;
  color: #ffffff;
  border: 1px solid #f59e0b;
`;

const TimeTest = styled.div`
  ${pillBase};
  background: #f5faff;
  color: #2f80ff;
  border: 1px solid #9cc6ff;
  white-space: nowrap;
`;

const Retry = styled.button`
  ${pillBase};
  background: #ffffff;
  color: #2f80ff;
  border: 1px solid #9cc6ff;
  width: fit-content;

  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f5faff;
  }
`;

const StartButton = styled.button`
  align-self: flex-end;

  height: 44px;
  padding: 0 22px;
  border-radius: 12px;

  background: #ffffff;
  border: 1px solid #dde2e4;
  color: #111827;

  font-size: 16px;
  font-weight: 500;

  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f9fafb;
  }
`;

function formatIsoToDDMMYYYY(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";

  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();

  return `${dd}.${mm}.${yyyy}`;
}

function formatSecondsToMinutes(seconds?: number | null): string | null {
  if (!seconds) return null;

  const minutes = Math.round(seconds / 60);

  // Определяем правильное склонение
  const lastDigit = minutes % 10;
  const lastTwoDigits = minutes % 100;

  let minuteWord = "минут"; // по умолчанию

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    minuteWord = "минута";
  } else if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    minuteWord = "минуты";
  }

  return `${minutes} ${minuteWord}`;
}

type TestCardProps = {
  test: TestResult;
  lastAttempt?: Attempt;
};

export function TestCard(props: TestCardProps) {
  const { test, lastAttempt } = props;
  console.log(lastAttempt);

  const scoreText =
    lastAttempt?.status === "graded" ? lastAttempt!.score / 10 : null;

  return (
    <Card>
      {!!scoreText && <ScoreFlag score={scoreText} max={10} />}

      <CardInfo>
        <Title>{test.title}</Title>
        <Description>{test.shortDescription}</Description>

        <Tags>
          {test.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Tags>

        <TimeContainer>
          {test.deadlineISO && (
            <DateTest>
              <DateIcon />
              <p>{formatIsoToDDMMYYYY(test.deadlineISO)}</p>
            </DateTest>
          )}

          {test.durationSec && (
            <TimeTest>
              <TimerIcon />
              <p>{formatSecondsToMinutes(test.durationSec)}</p>
            </TimeTest>
          )}
        </TimeContainer>

        <Retry type="button">
          {<RetryIcon />}
          Можно пройти заново
        </Retry>
      </CardInfo>
      <StartButton type="button">Пройти заново</StartButton>
    </Card>
  );
}
