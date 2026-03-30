import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import "../../index.css";
import { TestCard } from "./components/test/TestCard";
import { useStore } from "../Store/useStore";
import { StudentTestPageVM } from "./StudentTestPageVM";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StudentTestPage = observer(() => {
  const rootStore = useStore();
  const vm = useMemo(() => new StudentTestPageVM(rootStore), [rootStore]);

  useEffect(() => {
    vm.store.load();
  }, [vm]);

  if (vm.error) return <div>{vm.error}</div>;
  if (vm.loading) return <div className="custom-loader"></div>;

  return (
    <div>
      <Grid>
        <div>
          {vm.visibleTests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              lastAttempt={vm.lastAttemptByTest.get(test.id)}
            />
          ))}
        </div>
      </Grid>
    </div>
  );
});
