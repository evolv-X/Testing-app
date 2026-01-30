import styled from "@emotion/styled";
import { FlagIcon } from "../../../icons/icons"; // поправь путь

const ScoreBadge = styled.div`
  position: absolute;
  top: 0;
  right: 16px;

  min-width: 77px;
  height: 101px;

  pointer-events: none;
`;

const FlagWrap = styled.div`
  position: absolute;
  inset: 0;

  svg {
    min-width: 77px;
    height: 101px;
    display: block;
  }
`;

const ScoreText = styled.div`
  position: absolute;
  top: 29px;
  left: 0;
  right: 0;

  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  align-items: baseline;
  justify-content: center;

  font-weight: 700;
  line-height: 1;
  color: #2f80ff;

  .main {
    font-size: 28px;
  }

  .slash {
    font-size: 28px;
    font-weight: 600;
    opacity: 0.65;
    margin-left: 2px;
  }
`;

type ScoreFlagProps = {
  score: number;
  max?: number;
};

export function ScoreFlag({ score, max = 10 }: ScoreFlagProps) {
  return (
    <ScoreBadge>
      <FlagWrap>
        <FlagIcon />
      </FlagWrap>

      <ScoreText>
        <span className="main">{score}</span>
        <span className="slash">/{max}</span>
      </ScoreText>
    </ScoreBadge>
  );
}
