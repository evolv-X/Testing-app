import { Link } from "react-router-dom";

export function StudentTest() {
  const students = [
    {
      id: 0,
      name: "Python",
    },
    {
      id: 1,
      name: "js",
    },
    {
      id: 1,
      name: "Go",
    },
  ];

  return (
    <ul>
        {
            students.map(s => (
                <li key={s.id}>
                    <Link to={`/student/test/${s.id}`}>{s.name}</Link>
                </li>
            ))
        }
    </ul>
  );
}
