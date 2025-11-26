import { useNavigate } from "react-router-dom";

export function StudentPage() {
  const navigate = useNavigate();

  const handleTest = () => {
    navigate("/student/tests")
  }

  return (
    <div>
      <h1>Student page</h1>
      <button onClick={() => handleTest()}> пройти</button>
      <button onClick={() => navigate(-1)}> обратно</button>
    </div>
  );
}
