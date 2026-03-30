import { Activity, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TimerBox } from "./components/ui/TimerBox";

export function StudentResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (!state) {
      console.log("state is null");
      navigate(`/student/tests/`, {
        replace: true,
      });
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }
  console.log(state);
  const { resultMax, resultAnswer, durationSec, resultTime, attemptsAllowed } =
    state;
  console.log(resultMax);
  console.log(resultAnswer);
  console.log(durationSec);
  console.log(resultTime);
  console.log(attemptsAllowed);

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
      <Activity mode={attemptsAllowed === 0 ? "hidden" : "visible"}>
        <button onClick={takeTheTestAgain}>Попробовать снова</button>
      </Activity>
    </div>
  );
}
