import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TimerBox from "./components/ui/TimerBox";

export function StudentResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (!state) {
      navigate(`/student/tests/`, {
        replace: true,
      });
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { resultMax, resultAnswer, durationSec, resultTime, attemptsAllowed } =
    state;

  const takeTheTestAgain = () => {
    navigate(`/student/tests/${id}`, {
      replace: true,
    });
  };

  return (
    <div>
      <h1>StudentResultPage</h1>
      <div>
        <div>
          баллы {resultAnswer}/{resultMax}
        </div>
        <TimerBox durationSec={durationSec} finished={true} />
        <div>затрачено время {resultTime}</div>
      </div>
      {attemptsAllowed > 0 && (
        <button onClick={takeTheTestAgain}>Попробовать снова</button>
      )}
    </div>
  );
}
