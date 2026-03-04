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

interface QuestionElementCheckboxProps {
    id: number;
    text: string;
    options: string[];
    value: string[];
    onChange: (id: number, value: string[]) => void;
}

export function QuestionElementCheckbox(props: QuestionElementCheckboxProps) {
    const { id, text, options, value, onChange } = props;

    const toggle = (option: string) => {
        if (value.includes(option)) {
            onChange(
                id,
                value.filter(v => v !== option)
            );
        } else {
            onChange(id, [...value, option]);
        }
    };

    return (
        <TestItem>
            <p>{text}</p>
            {options.map((o, i) => (
                <label key={i}>
                    <input
                        type="checkbox"
                        name={`q-${id}`}
                        checked={value.includes(o)}
                        onChange={() => toggle(o)}
                    />
                    {o}
                </label>
            ))}
        </TestItem>
    );
}
