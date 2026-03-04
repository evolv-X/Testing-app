import React, { PureComponent } from 'react'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QuestionElement, type Question } from '../QuestionElement';

type AnswersState = Record<string, string | string[]>;

type QuestionBlockProps = {
  questions: Question[];
  loading: boolean;
  error: string;
  testId: number
}

export default function QuestionBlock(props: QuestionBlockProps) {
    const {questions, loading, error, testId} = props
    const [answers, setAnswers] = useState<AnswersState>({});
    console.log('answers', answers);

    const handleChange = (id: number, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [id]: value,
        }));
    };


    if (loading) return <div className="custom-loader"></div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (questions.length === 0) return <p>Вопросы не найдены</p>;

    return (
        <div>
            <h2>StudentTestPage {testId}</h2>
            <ul>
                {questions.map(q => (
                    <QuestionElement
                        key={q.id}
                        q={q}
                        value={
                            answers[q.id] ?? (q.type === 'multiple' ? [] : '')
                        }
                        onChange={handleChange}
                    />
                ))}
            </ul>
        </div>
    );
}
