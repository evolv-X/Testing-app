import { observer } from "mobx-react-lite";
import { useStore } from "../Store/useStore";

export const StudentStatistic = observer(() => {
  // const counter = useMemo(() => new Counter(), []);
  const { value, increment, decrement, reset } = useStore().counterStore;
  console.log(value);

  return (
    <div>
      StudentStatistic
      <div>{value}</div>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
});
