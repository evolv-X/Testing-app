import React, { PureComponent } from 'react'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../index.css";
import { QuestionElement } from "./components/QuestionElement";

export default function QuestionBlock() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("вывести массив");

  useEffect(() => {
    const data = "/public/data/questions.json";
    let isIgnore = false;
    fetch(data)
      .then((response) => {
        if (!response.ok) throw new Error(`http: ${response.status}`);
        return response.json();
      })
      .then((json) => {
        if (isIgnore) return;
        const questions = json.filter((q) => q.testId === testId);
        setQuestions(questions);
      })
      .catch((e) => {
        if (isIgnore) return;
        setError(String(e.message));
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      isIgnore = false;
    };
  }, []);

  const params = useParams();
  const testId = Number(params.id);

  return (
    <div>
      <h2>Studentpage {params.id}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, nemo.</p>
      {error === "" ? <div></div> : <div>{error}</div>}
      {loading && <div className="custom-loader"></div>}
      <ul>
        {questions.map((t) => (
          <QuestionElement key={t.id} t={t}></QuestionElement>
        ))}
        {questions.length === 0 && <li>Нет тестов</li>}
      </ul>
    </div>
  );
}
