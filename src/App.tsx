import styled from "@emotion/styled";
import { AppLayout } from "./layouts/AppLayout";

const Heading = styled.h1`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

function App() {
  return (
    <>
      <AppLayout></AppLayout>
    </>
  );
}

export default App;
