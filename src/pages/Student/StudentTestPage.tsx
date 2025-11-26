import { useParams } from "react-router-dom";

export function StudentTestPage() {
  const param = useParams()
  return (
    <div>
      <h2>Studentpage {param.id}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, nemo.</p>
    </div>
  );
}