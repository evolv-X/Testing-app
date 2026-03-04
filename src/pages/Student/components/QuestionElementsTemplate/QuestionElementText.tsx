import styled from '@emotion/styled';

const TestItem = styled.li`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 16px 16px;
    border: 1px solid #efefef;
    border-radius: ${p => p.theme.radius.md};
    box-shadow: 0px 1px 2px 0px #0000000d;
`;
interface QuestionElementTextProps {
    id: number;
    text: string;
    value: string;
    onChange: (id: number, value: string) => void;
}

export function QuestionElementText(props: QuestionElementTextProps) {
    const { id, text, value, onChange } = props;
    return (
        <TestItem>
            <p>{text}</p>
            <label key={id}>
                <input
                    type="text"
                    name={`q-${id}`}
                    value={value}
                    aria-label={`Вопрос:${id}`}
                    placeholder="Введите текст"
                    onChange={e => onChange(id, e.target.value)}
                />
            </label>
        </TestItem>
    );
}
