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
interface QuestionElementRadioProps {
    id: number;
    text: string;
    options: string[];
    value?: string;
    onChange: (id: number, value: string) => void;
}

export function QuestionElementRadio(props: QuestionElementRadioProps) {
    const { id, text, options, onChange, value } = props;
    return (
        <TestItem>
            <p>{text}</p>
            {options.map((o, i) => (
                <label key={o}>
                    <input
                        type="radio"
                        name={`q-${id}`}
                        value={o}
                        checked={value === o}
                        aria-label={`Вопрос:${id}, v-${i}`}
                        onChange={() => onChange(id, o)}
                    />
                    {o}
                </label>
            ))}
        </TestItem>
    );
}
