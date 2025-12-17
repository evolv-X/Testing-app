import styled from "@emotion/styled";

const TestItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
  border: 1px solid #efefef;
  border-radius: ${p => p.theme.radius.md};
  box-shadow: 0px 1px 2px 0px #0000000d;
`;

const QuestionText = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;

  input {
    cursor: pointer;
  }
`;


export function QuestionElement({ t }) {
  const isSingle = t.type === "single";

  return (
    <TestItem>
      <QuestionText>{t.text}</QuestionText>

      <OptionsList>
        {t.options.map((o, i) => (
          <Option key={i}>
            <input
              type={isSingle ? "radio" : "checkbox"}
              name={`question-${t.id}`}
              value={o}
              aria-label={`Вопрос:${t.id}, v-${i}`}
            />
            <span>{o}</span>
          </Option>
        ))}
      </OptionsList>
    </TestItem>
  );
}
