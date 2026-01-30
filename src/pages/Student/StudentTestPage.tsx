import { useEffect, useState } from "react";
import "../../index.css";
import styled from "@emotion/styled";
import { TestCard } from "./components/TestCard";
import type { Attempt, TestResult } from "../../types/testing";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export function StudentTestPage() {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [attempt, setAttempt] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  console.log(tests);
  console.log(attempt);

  useEffect(() => {
    const tests = "/public/data/tests.json";
    const attempt = "/public/data/attempts.json";
    Promise.all([fetch(tests), fetch(attempt)])
      .then(async ([res1, res2]) => {
        if (!res1.ok) throw new Error(`http: ${res1.status}`);
        if (!res2.ok) throw new Error(`http: ${res2.status}`);

        console.log(res2);

        const t = await res1.json();
        const a = await res2.json();

        setTests(t);
        setAttempt(a);
        setLoading(false)
        // return Promise.all([t, a]);
      })
      .catch((error) => {
        console.log(error.message);
        
        setError(error.message);
      });
  }, []);
  // if (true) return <h1>123</h1>;
  if (error) return <div>{error}</div>;
  if (loading) return <div className="custom-loader"></div>;

  return (
    <div>
      <Grid>
        <div>
          {tests.map((test) => (
            <TestCard key={test.id} test={test} lastAttempt={attempt[0]}/>
          ))}
        </div>
      </Grid>
    </div>
  );
}
